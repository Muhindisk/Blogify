import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useApp } from '../context/AppContext';
import Comments from '../components/Comments';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();
  const { data: post, loading, error, request } = useApi();
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // If already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // For relative paths, construct full URL
    const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}${imagePath}`;
  };

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadPost = async () => {
    try {
      const postData = await request('GET', `/posts/${id}`);
      // Initialize like state
      if (postData) {
        setLikesCount(postData.likes?.length || 0);
        setIsLiked(user ? postData.likes?.includes(user.id) : false);
      }
    } catch (err) {
      console.error('Error loading post:', err);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsLiking(true);
    try {
      // Use environment variable for API base URL
      const token = localStorage.getItem('token');
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiBaseUrl}/posts/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({})
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }
      
      const data = await response.json();
      setLikesCount(data.likes);
      setIsLiked(data.isLiked);
    } catch (err) {
      console.error('Error toggling like:', err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await request('DELETE', `/posts/${id}`);
        navigate('/');
      } catch (err) {
        console.error('Error deleting post:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Error: {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Post not found</p>
        <Link to="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  const canEdit = user && (user.role === 'admin' || post.author?._id === user.id);

  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {post.featuredImage && (
          <img 
            src={getImageUrl(post.featuredImage)} 
            alt={post.title}
            className="w-full h-96 object-cover"
          />
        )}
        
        <div className="p-8">
          {/* Header */}
          <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center text-gray-600 dark:text-gray-400 space-x-4">
                <Link 
                  to={`/profile/${post.author?.username}`}
                  className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  By {post.author?.username}
                </Link>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>

              {canEdit && (
                <div className="flex gap-3">
                  <Link 
                    to={`/edit-post/${post._id}`} 
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={handleDelete} 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Like Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                disabled={isLiking}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg 
                  className={`w-6 h-6 transition-colors ${
                    isLiked 
                      ? 'fill-red-500 stroke-red-500' 
                      : 'fill-none stroke-current'
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
                <span className="text-lg">{likesCount}</span>
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <strong className="text-gray-900 dark:text-white font-semibold">Categories: </strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.categories.map(cat => (
                  <span 
                    key={cat._id} 
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-6">
              <strong className="text-gray-900 dark:text-white font-semibold">Tags: </strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/" 
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div id="comments" className="mt-8">
        <Comments postId={post._id} />
      </div>
    </article>
  );
};

export default PostDetail;