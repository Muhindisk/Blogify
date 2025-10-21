import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import api from '../services/api';

const EditProfile = () => {
  const { user, updateUser } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    website: '',
    avatar: ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchUserData = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await api.get(`/users/${user.username}`);
      const userData = response.data.user;
      setFormData({
        bio: userData.bio || '',
        location: userData.location || '',
        website: userData.website || '',
        avatar: userData.avatar || ''
      });
      setAvatarPreview(userData.avatar || '');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchUserData();
  }, [user, navigate, fetchUserData]);

  // Debug: Log when avatarPreview changes
  useEffect(() => {
    console.log('Avatar preview updated:', avatarPreview ? `${avatarPreview.substring(0, 50)}...` : 'empty');
  }, [avatarPreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select an image file' });
        return;
      }

      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Preview created, length:', reader.result?.length);
        setAvatarPreview(reader.result);
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        setMessage({ type: 'error', text: 'Failed to read image file' });
      };
      reader.readAsDataURL(file);
      setMessage({ type: '', text: '' });
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview('');
    setFormData(prev => ({ ...prev, avatar: '' }));
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return formData.avatar;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', avatarFile);

      const response = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);
      // Backend returns fileUrl, not url
      return response.data.fileUrl || response.data.url;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw new Error('Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Upload avatar if new file selected
      let avatarUrl = formData.avatar;
      if (avatarFile) {
        console.log('Uploading avatar...');
        avatarUrl = await uploadAvatar();
        console.log('Avatar uploaded:', avatarUrl);
      }

      const updateData = {
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        avatar: avatarUrl
      };

      console.log('Updating profile with data:', updateData);
      const response = await api.put('/users/profile', updateData);
      console.log('Profile updated successfully:', response.data);
      
      // Update user context with ALL user data from response
      updateUser({
        ...response.data,
        // Ensure critical fields are updated
        username: response.data.username,
        email: response.data.email,
        bio: response.data.bio,
        location: response.data.location,
        website: response.data.website,
        avatar: response.data.avatar,
        _id: response.data._id
      });

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Redirect to profile after 2 seconds with refresh flag
      setTimeout(() => {
        navigate(`/profile/${user.username}`, { state: { refresh: true } });
      }, 2000);
    } catch (error) {
      console.error('Error updating profile:', error);
      console.error('Error response:', error.response);
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Failed to update profile. Please try again.';
      setMessage({ 
        type: 'error', 
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Edit Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Update your profile information
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Photo
            </label>
            
            <div className="flex items-center gap-6">
              {/* Avatar Preview */}
              <div className="flex-shrink-0">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-200 dark:border-primary-800"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center border-4 border-primary-200 dark:border-primary-800">
                    <span className="text-4xl font-bold text-white">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1">
                <div className="flex gap-3">
                  <label className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer font-medium">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      disabled={uploading || loading}
                    />
                    {uploading ? 'Uploading...' : 'Upload Photo'}
                  </label>
                  
                  {(avatarPreview || avatarFile) && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      disabled={uploading || loading}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
                {avatarFile && (
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    Selected: {avatarFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              maxLength={500}
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {formData.bio.length}/500 characters
            </p>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              maxLength={100}
              placeholder="City, Country"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              maxLength={200}
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                loading || uploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {uploading ? 'Uploading...' : loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/profile/${user.username}`)}
              className="flex-1 py-3 px-6 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Account Info */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Account Information
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Username:</span>
              <span className="font-medium text-gray-900 dark:text-white">{user.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Email:</span>
              <span className="font-medium text-gray-900 dark:text-white">{user.email}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              Username and email cannot be changed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
