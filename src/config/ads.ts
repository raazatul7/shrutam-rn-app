/**
 * Google Mobile Ads Configuration
 * Contains ad unit IDs and configuration settings
 */

export const ADS_CONFIG = {
  // Test Ad Unit IDs (for development)
  TEST_BANNER_AD_UNIT_ID: 'ca-app-pub-3940256099942544/6300978111',
  TEST_INTERSTITIAL_AD_UNIT_ID: 'ca-app-pub-3940256099942544/1033173712',
  TEST_REWARDED_AD_UNIT_ID: 'ca-app-pub-3940256099942544/5224354917',

  // Production Ad Unit IDs (replace with your actual ad unit IDs)
  PRODUCTION_BANNER_AD_UNIT_ID: 'ca-app-pub-6350541569686511/9801428195', // Replace with your banner ad unit ID
  PRODUCTION_BANNER_AD_UNIT_ID_ANDROID: 'ca-app-pub-6350541569686511/6883588990', // Replace with your banner ad unit ID
  PRODUCTION_INTERSTITIAL_AD_UNIT_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // Replace with your interstitial ad unit ID
  PRODUCTION_REWARDED_AD_UNIT_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // Replace with your rewarded ad unit ID

  // App ID (replace with your actual app ID)
  APP_ID: {
    ANDROID: 'ca-app-pub-6350541569686511~8025312093', // Replace with your Android app ID
    IOS: 'ca-app-pub-6350541569686511~3718385518', // Replace with your iOS app ID
  },

  // Development settings
  IS_DEVELOPMENT: __DEV__, // Automatically true in development mode
};

/**
 * Get the appropriate ad unit ID based on environment
 */
export const getBannerAdUnitId = (): string => {
  return ADS_CONFIG.IS_DEVELOPMENT 
    ? ADS_CONFIG.TEST_BANNER_AD_UNIT_ID 
    : ADS_CONFIG.PRODUCTION_BANNER_AD_UNIT_ID;
};

/**
 * Get the appropriate app ID based on platform
 */
export const getAppId = (): string => {
  // In a real app, you would detect the platform here
  // For now, we'll use Android as default
  return ADS_CONFIG.IS_DEVELOPMENT 
    ? 'ca-app-pub-3940256099942544~3347511713' // Test Android app ID
    : ADS_CONFIG.APP_ID.ANDROID;
};
