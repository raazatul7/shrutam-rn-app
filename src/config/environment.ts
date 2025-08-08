/**
 * Environment Configuration
 * Centralized environment variable management with debugging
 */

import { BASE_URL, API_TIMEOUT, APP_NAME, APP_VERSION } from '@env';

// Environment configuration object
export const environment = {
  BASE_URL,
  API_TIMEOUT: parseInt(API_TIMEOUT, 10) || 10000,
  APP_NAME,
  APP_VERSION,
};

// Debug function to log environment variables
export const debugEnvironment = () => {
  console.log('🔧 Environment Configuration:');
  console.log('📍 BASE_URL:', environment.BASE_URL);
  console.log('⏱️ API_TIMEOUT:', environment.API_TIMEOUT);
  console.log('📱 APP_NAME:', environment.APP_NAME);
  console.log('📦 APP_VERSION:', environment.APP_VERSION);
  
  // Validate BASE_URL
  if (!environment.BASE_URL) {
    console.error('❌ BASE_URL is undefined!');
  } else if (environment.BASE_URL.includes('localhost')) {
    console.warn('⚠️ BASE_URL contains localhost - this may not work on Android emulator');
  } else {
    console.log('✅ BASE_URL looks good');
  }
};

// Export individual variables for backward compatibility
export const { BASE_URL: BASE_URL_EXPORT, API_TIMEOUT: API_TIMEOUT_EXPORT } = environment;
