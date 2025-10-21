/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  posts: [],
  loading: false,
  error: null,
  theme: 'light'
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (token && user) {
      const parsedUser = JSON.parse(user);
      console.log('Loading user from localStorage:', parsedUser);
      console.log('Avatar from localStorage:', parsedUser.avatar);
      dispatch({ type: 'SET_USER', payload: parsedUser });
    }

    // Set initial theme
    dispatch({ type: 'SET_THEME', payload: savedTheme });
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const login = (userData) => {
    console.log('Login - storing user data:', userData.user);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    dispatch({ type: 'SET_USER', payload: userData.user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'SET_USER', payload: null });
  };

  const updateUser = (userData) => {
    const updatedUser = { ...state.user, ...userData };
    console.log('Updating user in context:', updatedUser);
    console.log('Avatar URL:', updatedUser.avatar);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    dispatch({ type: 'SET_USER', payload: updatedUser });
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <AppContext.Provider value={{
      ...state,
      dispatch,
      login,
      logout,
      updateUser,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};