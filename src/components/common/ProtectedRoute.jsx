// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { onboardingUtils } from '../../contexts/onboarding';

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0514]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Define this once to avoid logic errors
  const isCurrentlyOnOnboardingPage = location.pathname.startsWith('/seeker/onboarding');

  // PROVIDER LOGIC
  if (user.role === 'provider') {
    // Provider should NEVER see onboarding
    if (isCurrentlyOnOnboardingPage) {
      return <Navigate to="/provider/dashboard" replace />;
    }
    
    if (allowedRole && allowedRole !== 'provider') {
      return <Navigate to="/provider/dashboard" replace />;
    }
    return children;
  }

  // SEEKER LOGIC
  if (user.role === 'seeker') {
    const isCompleted = onboardingUtils.isOnboardingCompleted();

    // Loop Prevention Gate
    if (!isCompleted) {
      if (!isCurrentlyOnOnboardingPage) {
        return <Navigate to="/seeker/onboarding" replace />;
      }
      // If they ARE on onboarding and NOT completed, let them stay
      return children; 
    }

    // If completed and trying to access onboarding, send to dashboard
    if (isCompleted && isCurrentlyOnOnboardingPage) {
      return <Navigate to="/seeker/dashboard" replace />;
    }
  }

  // Final role authorization
  if (allowedRole && user.role !== allowedRole) {
    const fallback = user.role === 'provider' ? '/provider/dashboard' : '/seeker/dashboard';
    return <Navigate to={fallback} replace />;
  }

  return children;
}