import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import api from '../services/api';

const UserProfile = () => {
  const { username } = useParams();
  const location = useLocation();
  const { user: currentUser } = useApp();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${username}`);
      console.log('Profile data received:', response.data);
      console.log('User avatar from profile:', response.data.user?.avatar);
      setProfileData(response.data);
      
      // Check if current user is following this profile
      if (currentUser && response.data.user.followers) {
        setIsFollowing(
          response.data.user.followers.some(f => f._id === currentUser.id || f === currentUser.id)
        );
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }, [username, currentUser]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Refresh profile when navigating back (e.g., after editing)
  useEffect(() => {
    if (location.state?.refresh) {
      fetchProfile();
    }
  }, [location.state, fetchProfile]);

  const handleFollow = async () => {
    if (!currentUser) {
      alert('Please login to follow users');
      return;
    }

    try {
      setFollowLoading(true);
      const response = await api.post(`/users/${profileData.user._id}/follow`);
      setIsFollowing(response.data.isFollowing);
      
      // Update followers count
      setProfileData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          followersCount: response.data.followersCount
        }
      }));
    } catch (error) {
      console.error('Error toggling follow:', error);
      alert(error.response?.data?.message || 'Failed to follow user');
    } finally {
      setFollowLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User not found</h2>
        <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">
          Go back to home
        </Link>
      </div>
    );
  }

  const { user, posts, stats } = profileData;
  const isOwnProfile = currentUser && currentUser.username === user.username;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user.avatar ? (
              <img
                src={`${user.avatar}${user.avatar.includes('?') ? '&' : '?'}t=${Date.now()}`}
                alt={user.username}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary-200 dark:border-primary-800"
                key={user.avatar} // Force re-render when avatar changes
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center border-4 border-primary-200 dark:border-primary-800">
                <span className="text-5xl font-bold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {user.username}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Joined {formatDate(user.createdAt)}
                </p>
              </div>
              
              {/* Follow Button */}
              {!isOwnProfile && currentUser && (
                <button
                  onClick={handleFollow}
                  disabled={followLoading}
                  className={`mt-4 md:mt-0 px-6 py-2 rounded-lg font-medium transition-colors ${
                    isFollowing
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  } ${followLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {followLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
                </button>
              )}

              {isOwnProfile && (
                <Link
                  to="/edit-profile"
                  className="mt-4 md:mt-0 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Edit Profile
                </Link>
              )}
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="text-gray-700 dark:text-gray-300 mb-4">{user.bio}</p>
            )}

            {/* Additional Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              {user.location && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span>{user.website}</span>
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalPosts}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
              </div>
              <div className="text-center cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.followersCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
              </div>
              <div className="text-center cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.followingCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'posts'
                  ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Posts ({stats.totalPosts})
            </button>
          </nav>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6">
        {posts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {isOwnProfile ? "Start writing your first post!" : "This user hasn't posted anything yet."}
            </p>
          </div>
        ) : (
          posts.map(post => (
            <Link
              key={post._id}
              to={`/posts/${post._id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full md:w-48 h-48 object-cover"
                  />
                )}
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        ❤️ {post.likes?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
