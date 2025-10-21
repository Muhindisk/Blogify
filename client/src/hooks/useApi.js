import { useState } from 'react';
import api from '../services/api';

export const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, url, body = null) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Add auth token if available
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      switch (method.toUpperCase()) {
        case 'GET':
          response = await api.get(url, config);
          break;
        case 'POST':
          response = await api.post(url, body, config);
          break;
        case 'PUT':
          response = await api.put(url, body, config);
          break;
        case 'DELETE':
          response = await api.delete(url, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      setData(response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  return { data, loading, error, request };
};

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await api.get(`/posts?${queryString}`);
      
      setPosts(response.data.posts || []);
      setPagination(response.data.pagination || null);
      setLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch posts';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  return { posts, pagination, loading, error, fetchPosts };
};
