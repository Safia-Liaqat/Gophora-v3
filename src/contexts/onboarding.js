// src/utils/onboarding.js

export const onboardingUtils = {
  // Check if onboarding is completed
  isOnboardingCompleted: () => {
    try {
      // Get current user ID from multiple possible locations
      let userId = localStorage.getItem('user_id');
      
      // If no user_id in localStorage, try to get from AuthContext state
      if (!userId) {
        // Check if there's a token - if yes, user is likely logged in
        const token = localStorage.getItem('token');
        if (token) {
          // Try to extract user ID from profile or use a default
          const profile = localStorage.getItem('user_profile');
          if (profile) {
            const profileData = JSON.parse(profile);
            userId = profileData.id || profileData.user_id;
            if (userId) localStorage.setItem('user_id', userId);
          }
        }
      }
      
      // If we have a user ID, check user-specific completion
      if (userId) {
        const userOnboarding = localStorage.getItem(`onboarding_completed_${userId}`);
        if (userOnboarding === 'true') return true;
        
        // Also check session storage
        const userSessionOnboarding = sessionStorage.getItem(`onboarding_completed_${userId}`);
        if (userSessionOnboarding === 'true') return true;
      }
      
      // Fallback to general check
      const generalCompleted = localStorage.getItem('onboarding_completed') === 'true';
      const sessionCompleted = sessionStorage.getItem('onboarding_completed') === 'true';
      
      return generalCompleted || sessionCompleted;
      
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  },
  
  // Mark onboarding as completed
  completeOnboarding: () => {
    try {
      let userId = localStorage.getItem('user_id');
      
      // If no user ID but there's a token, try to get from profile
      if (!userId) {
        const profile = localStorage.getItem('user_profile');
        if (profile) {
          const profileData = JSON.parse(profile);
          userId = profileData.id || profileData.user_id;
          if (userId) localStorage.setItem('user_id', userId);
        }
      }
      
      if (userId) {
        // Store user-specific completion
        localStorage.setItem(`onboarding_completed_${userId}`, 'true');
        sessionStorage.setItem(`onboarding_completed_${userId}`, 'true');
        localStorage.setItem(`last_onboarding_user`, userId);
      }
      
      // Always store general completion flags
      localStorage.setItem('onboarding_completed', 'true');
      sessionStorage.setItem('onboarding_completed', 'true');
      localStorage.setItem('onboarding_timestamp', Date.now().toString());
      
    } catch (error) {
      console.error('Error marking onboarding as complete:', error);
    }
  },
  
  // Get explorer profile
  getExplorerProfile: () => {
    try {
      let userId = localStorage.getItem('user_id');
      
      if (!userId) {
        const profile = localStorage.getItem('user_profile');
        if (profile) {
          const profileData = JSON.parse(profile);
          userId = profileData.id || profileData.user_id;
        }
      }
      
      // Try user-specific profile first
      if (userId) {
        const userProfile = localStorage.getItem(`explorer_profile_${userId}`);
        if (userProfile) {
          return JSON.parse(userProfile);
        }
      }
      
      // Fallback to general profile
      const generalProfile = localStorage.getItem('explorer_profile');
      return generalProfile ? JSON.parse(generalProfile) : null;
      
    } catch (error) {
      console.error('Error getting explorer profile:', error);
      return null;
    }
  },
  
  // Save explorer profile
  saveExplorerProfile: (profile) => {
    try {
      let userId = localStorage.getItem('user_id');
      
      if (!userId && profile.userId) {
        userId = profile.userId;
        localStorage.setItem('user_id', userId);
      }
      
      const profileData = JSON.stringify({
        ...profile,
        userId: userId,
        savedAt: new Date().toISOString()
      });
      
      // Save user-specific profile
      if (userId) {
        localStorage.setItem(`explorer_profile_${userId}`, profileData);
      }
      
      // Also save general profile for backward compatibility
      localStorage.setItem('explorer_profile', profileData);
      
    } catch (error) {
      console.error('Error saving explorer profile:', error);
    }
  },
  
  // Reset onboarding (for testing or logout)
  resetOnboarding: () => {
    try {
      const userId = localStorage.getItem('user_id');
      
      if (userId) {
        localStorage.removeItem(`onboarding_completed_${userId}`);
        sessionStorage.removeItem(`onboarding_completed_${userId}`);
        localStorage.removeItem(`explorer_profile_${userId}`);
      }
      
      // Clear general onboarding flags
      localStorage.removeItem('onboarding_completed');
      sessionStorage.removeItem('onboarding_completed');
      localStorage.removeItem('onboarding_timestamp');
      localStorage.removeItem('explorer_profile');
      localStorage.removeItem('last_onboarding_user');
      
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  }
};