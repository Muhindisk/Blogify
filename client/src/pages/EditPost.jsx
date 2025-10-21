import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useApi } from '../hooks/useApi';
import ImageUpload from '../components/ImageUpload';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();
  const { error, request } = useApi();
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categories: [],
    tags: [],
    featuredImage: '',
    status: 'draft'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadPost = async () => {
      try {
        const post = await request('GET', `/posts/${id}`);
        setFormData({
          title: post.title || '',
          content: post.content || '',
          categories: post.categories?.map(cat => cat._id) || [],
          tags: post.tags?.join(', ') || '',
          featuredImage: post.featuredImage || '',
          status: post.status || 'draft'
        });
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading post:', err);
        setIsLoading(false);
      }
    };

    const loadCategories = async () => {
      try {
        const response = await request('GET', '/categories');
        setCategories(response.categories || []);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };

    loadPost();
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'tags') {
      setFormData(prev => ({
        ...prev,
        tags: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitting(true);
    try {
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      await request('PUT', `/posts/${id}`, submitData);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error('Error updating post:', err);
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Please log in to edit posts.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter post title"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="15"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
              placeholder="Write your post content here..."
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <ImageUpload
              currentImage={formData.featuredImage}
              onUploadSuccess={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Categories {formData.categories.length > 0 && (
                <span className="text-primary-600 dark:text-primary-400 text-xs ml-2">
                  ({formData.categories.length} selected)
                </span>
              )}
            </label>
            {categories.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm italic">Loading categories...</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {categories.map(category => {
                  const isSelected = formData.categories.includes(category._id);
                  return (
                    <button
                      key={category._id}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setFormData(prev => ({
                            ...prev,
                            categories: prev.categories.filter(id => id !== category._id)
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            categories: [...prev.categories, category._id]
                          }));
                        }
                      }}
                      className={`
                        px-4 py-2 rounded-lg font-medium transition-all duration-200
                        ${isSelected
                          ? 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }
                      `}
                    >
                      {isSelected && (
                        <span className="mr-2">✓</span>
                      )}
                      {category.name}
                    </button>
                  );
                })}
              </div>
            )}
            {formData.categories.length === 0 && categories.length > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                💡 Click to select categories for your post
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
              onChange={handleChange}
              placeholder="react, javascript, web-development"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button 
              type="submit" 
              disabled={submitting}
              className="flex-1 py-3 px-6 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                'Update Post'
              )}
            </button>
            
            <button 
              type="button"
              onClick={() => navigate(`/posts/${id}`)}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
