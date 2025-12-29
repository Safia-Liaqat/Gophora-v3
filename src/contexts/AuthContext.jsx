import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIURL } from '../services/api'; // IMPORT APIURL
import { onboardingUtils } from './onboarding'

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
      const email = localStorage.getItem('email');
      const role = localStorage.getItem('role');
      const refreshToken = localStorage.getItem('refresh_token');

      if (token && userId && email && role) {
        setUser({
          userId,
          email,
          role,
          token,
          refreshToken,
        });
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // In your login function in AuthContext.js
const login = async (email, password, role) => {
  try {
    const formBody = new URLSearchParams();
    formBody.append('username', email);
    formBody.append('password', password);

    const response = await fetch(`${APIURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();

    // Store in localStorage - CRITICAL: Store user_id FIRST
    localStorage.setItem('user_id', data.user_id); // THIS MUST COME FIRST
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('email', data.email);
    localStorage.setItem('role', role);

    // Update context state
    setUser({
      userId: data.user_id,
      email: data.email,
      role,
      token: data.access_token,
      refreshToken: data.refresh_token,
    });

    // Fetch user profile
    try {
      const profileResponse = await fetch(`${APIURL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      if (profileResponse.ok) {
        const profile = await profileResponse.json();
        localStorage.setItem('user_profile', JSON.stringify(profile));
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }

    return { 
      success: true, 
      role,
      user: {
        id: data.user_id,
        email: data.email,
        role: role
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
  const logout = async () => {
    try {
      // Optional: Call backend logout endpoint to invalidate refresh token
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken && user?.token) {
        // CHANGED: Use APIURL
        await fetch(`${APIURL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        }).catch(err => console.error('Logout backend error:', err));
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear all auth data
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      localStorage.removeItem('user_profile');
      localStorage.removeItem('pending_application_id');
      localStorage.removeItem('applicationsSentDelta');

      // NEW: Clear onboarding data for this user
      const userId = localStorage.getItem('user_id');
      if (userId) {
        localStorage.removeItem(`onboarding_completed_${userId}`);
        sessionStorage.removeItem(`onboarding_completed_${userId}`);
        localStorage.removeItem(`explorer_profile_${userId}`);
      }
      
      // Clear general onboarding data
      localStorage.removeItem('onboarding_completed');
      sessionStorage.removeItem('onboarding_completed');
      localStorage.removeItem('onboarding_timestamp');
      localStorage.removeItem('explorer_profile');
      localStorage.removeItem('user_id'); // Also remove user_id

      // Reset context state
      setUser(null);

      // Navigate to login
      navigate('/login');
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // CHANGED: Use APIURL
      const response = await fetch(`${APIURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Refresh token expired');
      }

      const data = await response.json();

      // Update tokens
      localStorage.setItem('token', data.access_token);
      if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }

      // Update context
      setUser(prev => ({
        ...prev,
        token: data.access_token,
        refreshToken: data.refresh_token || prev.refreshToken,
      }));

      return data.access_token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout user
      await logout();
      throw error;
    }
  };

  // NEW: Function to check if onboarding is required for current user
  const checkOnboardingStatus = () => {
    if (!user) return { requiresOnboarding: false };
    
    // Only seekers need onboarding
    if (user.role !== 'seeker') {
      return { requiresOnboarding: false };
    }
    
    const isCompleted = onboardingUtils.isOnboardingCompleted();
    return {
      requiresOnboarding: !isCompleted,
      isCompleted: isCompleted
    };
  };

  // NEW: Function to manually mark onboarding as completed
  const markOnboardingCompleted = () => {
    onboardingUtils.completeOnboarding();
  };

  // NEW: Function to get explorer profile
  const getExplorerProfile = () => {
    return onboardingUtils.getExplorerProfile();
  };

  const value = {
    user,
    loading,
    login,
    logout,
    refreshAccessToken,
    isAuthenticated: !!user,
    checkOnboardingStatus, // NEW
    markOnboardingCompleted, // NEW
    getExplorerProfile, // NEW
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};