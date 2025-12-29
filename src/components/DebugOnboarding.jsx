// src/components/DebugOnboarding.jsx
import React from 'react';
import { onboardingUtils } from "../contexts/onboarding"

export default function DebugOnboarding() {
  const userId = localStorage.getItem('user_id');
  const isCompleted = onboardingUtils.isOnboardingCompleted();
  const profile = onboardingUtils.getExplorerProfile();
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 p-4 rounded-lg text-xs text-white z-50">
      <div className="font-bold mb-2">Onboarding Debug:</div>
      <div>User ID: {userId || 'Not set'}</div>
      <div>Completed: {isCompleted ? 'Yes' : 'No'}</div>
      <div>Profile: {profile ? 'Exists' : 'None'}</div>
      <div>localStorage user_id: {localStorage.getItem('user_id')}</div>
      <div>localStorage token: {localStorage.getItem('token') ? 'Exists' : 'None'}</div>
      <div>localStorage role: {localStorage.getItem('role')}</div>
      <button 
        onClick={() => {
          localStorage.clear();
          sessionStorage.clear();
          window.location.reload();
        }}
        className="mt-2 text-red-400 hover:text-red-300"
      >
        Clear All Storage
      </button>
    </div>
  );
}