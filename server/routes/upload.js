import express from 'express';
import { upload, handleMulterError } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import FormData from 'form-data';
import axios from 'axios';

const router = express.Router();

// @desc    Upload single image
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('image'), handleMulterError, async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('User:', req.user);
    
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to ImgBB
    const formData = new FormData();
    formData.append('image', req.file.buffer.toString('base64'));
    
    console.log('Uploading to ImgBB...');
    
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 30000
      }
    );

    if (response.data && response.data.success && response.data.data) {
      const fileUrl = response.data.data.url;
      
      console.log('File uploaded successfully to ImgBB:', fileUrl);
      
      res.status(201).json({
        success: true,
        message: 'File uploaded successfully to ImgBB',
        fileUrl: fileUrl,
        url: fileUrl,
        filename: response.data.data.title,
        originalName: req.file.originalname,
        deleteUrl: response.data.data.delete_url,
        size: req.file.size
      });
    } else {
      throw new Error('ImgBB upload failed');
    }
  } catch (error) {
    console.error('Upload error:', error);
    
    let errorMessage = 'Failed to upload image';
    if (error.response?.data?.error?.message) {
      errorMessage = error.response.data.error.message;
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      errorMessage = 'Upload timeout. Please try again or use a smaller image.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    res.status(400).json({ 
      message: errorMessage,
      suggestion: 'Use the "Add Image URL" button to paste a link to your image instead',
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
});

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private
router.post('/multiple', protect, upload.array('images', 5), handleMulterError, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Upload all files to ImgBB
    const uploadPromises = req.files.map(async (file) => {
      const formData = new FormData();
      formData.append('image', file.buffer.toString('base64'));
      
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        formData,
        {
          headers: formData.getHeaders(),
          timeout: 30000
        }
      );

      return {
        fileUrl: response.data.data.url,
        filename: response.data.data.title,
        originalName: file.originalname,
        size: file.size
      };
    });

    const fileUrls = await Promise.all(uploadPromises);

    res.status(201).json({
      success: true,
      message: 'Files uploaded successfully to ImgBB',
      files: fileUrls
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
