import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import { validationResult } from 'express-validator';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const search = req.query.search || '';
    const category = req.query.category || '';
    
    let query = { status: 'published' };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.categories = category;
    }
    
    const posts = await Post.find(query)
      .populate('author', 'username')
      .populate('categories', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Add comment counts to posts
    const postsWithCommentCount = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comment.countDocuments({ post: post._id });
        return {
          ...post.toObject(),
          commentCount
        };
      })
    );
    
    const total = await Post.countDocuments(query);
    
    res.json({
      posts: postsWithCommentCount,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
        limit
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username avatar')
      .populate('categories', 'name slug');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const post = new Post({
      ...req.body,
      author: req.user.id
    });
    
    const savedPost = await post.save();
    await savedPost.populate('author', 'username');
    await savedPost.populate('categories', 'name slug');
    
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user owns the post or is admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username').populate('categories', 'name slug');
    
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user owns the post or is admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle like on post
// @route   POST /api/posts/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  try {
    console.log('Toggle like request for post:', req.params.id);
    console.log('User ID:', req.user?.id);
    
    const post = await Post.findById(req.params.id).populate('author', 'username');
    
    if (!post) {
      console.log('Post not found');
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const wasLiked = post.isLikedBy(req.user.id);
    
    console.log('Post found, toggling like...');
    await post.toggleLike(req.user.id);
    
    // Create notification for post author if post was liked (not unliked)
    // and the liker is not the author themselves
    if (!wasLiked && post.author._id.toString() !== req.user.id) {
      const liker = await User.findById(req.user.id);
      await User.findByIdAndUpdate(post.author._id, {
        $push: {
          notifications: {
            type: 'like',
            message: `${liker.username} liked your post "${post.title}"`,
            postId: post._id,
            fromUser: req.user.id,
            read: false,
            createdAt: new Date()
          }
        }
      });
      console.log('Notification created for post author');
    }
    
    // Return the updated post with like information
    const updatedPost = await Post.findById(req.params.id)
      .populate('author', 'username avatar')
      .populate('categories', 'name slug');
    
    console.log('Like toggled successfully');
    res.json({
      likes: updatedPost.likes.length,
      isLiked: updatedPost.isLikedBy(req.user.id),
      post: updatedPost
    });
  } catch (error) {
    console.error('Error in toggleLike:', error);
    res.status(500).json({ message: error.message });
  }
};
