// contexts/AuthContext.jsx - COMPLETE FIXED VERSION
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIURL } from '../services/api';

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

  // Initialize auth state from localStorage - WITHOUT TOKEN VALIDATION
  useEffect(() => {
    const initAuth = () => {
      console.log('🔐 AuthContext: Initializing auth state');
      
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
      const email = localStorage.getItem('email');
      const role = localStorage.getItem('role');
      const refreshToken = localStorage.getItem('refresh_token');

      // Log what we found
      console.log('📦 localStorage data:', {
        token: token ? '✅ Present' : '❌ Missing',
        userId: userId || '❌ Missing',
        email: email || '❌ Missing',
        role: role || '❌ Missing',
        refreshToken: refreshToken ? '✅ Present' : '❌ Missing'
      });

      // Check if we have ALL required auth data
      if (token && userId && email && role) {
        console.log('👤 Setting user from localStorage');
        setUser({
          userId,
          email,
          role,
          token,
          refreshToken,
        });
      } else {
        console.log('🚫 No complete auth data found');
        // Only clear if we have partial data
        if (token || userId || email || role) {
          console.log('🧹 Cleaning up partial auth data');
          // Don't clear everything - just remove what's incomplete
          if (!token) localStorage.removeItem('token');
          if (!userId) localStorage.removeItem('user_id');
          if (!email) localStorage.removeItem('email');
          if (!role) localStorage.removeItem('role');
          if (!refreshToken) localStorage.removeItem('refresh_token');
        }
        setUser(null);
      }
      
      setLoading(false);
      console.log('✅ Auth initialization complete, loading:', false);
    };

    initAuth();
  }, []);

  const login = async (email, password, role) => {
    try {
      console.log('🔐 Attempting login for:', email, 'role:', role);
      
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
        console.error('❌ Login failed:', errorData);
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      console.log('✅ Login response:', data);

      // Store in localStorage
      localStorage.setItem('user_id', data.user_id || data.userId || data.id);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);

      // Update context state
      const newUser = {
        userId: data.user_id || data.userId || data.id,
        email: email,
        role,
        token: data.access_token,
        refreshToken: data.refresh_token,
      };
      
      console.log('👤 Setting user context:', newUser);
      setUser(newUser);

      // Fetch user profile (optional, can be done later)
      try {
        const profileResponse = await fetch(`${APIURL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });

        if (profileResponse.ok) {
          const profile = await profileResponse.json();
          localStorage.setItem('user_profile', JSON.stringify(profile));
          console.log('📋 User profile stored');
        }
      } catch (err) {
        console.warn('⚠️ Profile fetch failed (optional):', err);
      }

      return { 
        success: true, 
        role,
        user: newUser
      };
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const token = localStorage.getItem('token');
      
      if (refreshToken && token) {
        await fetch(`${APIURL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        }).catch(err => console.warn('⚠️ Logout API error:', err));
      }
    } catch (err) {
      console.error('❌ Logout error:', err);
    } finally {
      console.log('👋 Performing logout cleanup');
      
      // Get userId before clearing
      const userId = localStorage.getItem('user_id');
      
      // Clear all auth-related localStorage items
      const itemsToClear = [
        'token',
        'refresh_token',
        'user_id',
        'email',
        'role',
        'user_profile',
        'pending_application_id',
        'applicationsSentDelta',
        'onboarding_completed',
        'onboarding_timestamp',
        'explorer_profile',
        'last_onboarding_user'
      ];
      
      itemsToClear.forEach(item => localStorage.removeItem(item));
      
      // Clear user-specific onboarding if we have userId
      if (userId) {
        localStorage.removeItem(`onboarding_completed_${userId}`);
        localStorage.removeItem(`explorer_profile_${userId}`);
      }
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Reset context state
      setUser(null);
      
      console.log('✅ Logout completed');
      
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

      console.log('🔄 Refreshing access token');
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

      // Update tokens in localStorage
      localStorage.setItem('token', data.access_token);
      if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }

      // Update context state
      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          token: data.access_token,
          refreshToken: data.refresh_token || prev.refreshToken,
        };
      });

      console.log('✅ Token refreshed');
      return data.access_token;
    } catch (error) {
      console.error('❌ Token refresh failed:', error);
      await logout();
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    refreshAccessToken,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};