# Google Mobile Ads Setup Guide for Shrutam App

This guide explains how to set up Google Mobile Ads in the Shrutam React Native app.

## 🚀 What's Already Implemented

✅ **Banner Ad Component**: A reusable `BannerAdComponent` that displays ads at the bottom of the Today screen
✅ **Configuration System**: Centralized ad configuration in `src/config/ads.ts`
✅ **SDK Initialization**: Google Mobile Ads SDK is initialized in `App.tsx`
✅ **Platform Configuration**: Android and iOS configurations are set up with test ad unit IDs

## 📱 Current Implementation

### Banner Ad Location
- **Position**: Bottom of the Today screen, above the tab navigation
- **Size**: Standard banner (320x50)
- **Behavior**: Automatically loads and displays test ads in development

### Test Ad Unit IDs (Currently Used)
- **Banner**: `ca-app-pub-3940256099942544/6300978111`
- **Android App ID**: `ca-app-pub-3940256099942544~3347511713`
- **iOS App ID**: `ca-app-pub-3940256099942544~1458002511`

## 🔧 Configuration Files

### 1. Ad Configuration (`src/config/ads.ts`)
```typescript
export const ADS_CONFIG = {
  // Test Ad Unit IDs (for development)
  TEST_BANNER_AD_UNIT_ID: 'ca-app-pub-3940256099942544/6300978111',
  
  // Production Ad Unit IDs (replace with your actual ad unit IDs)
  PRODUCTION_BANNER_AD_UNIT_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  
  // App ID (replace with your actual app ID)
  APP_ID: {
    ANDROID: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',
    IOS: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',
  },
  
  // Development settings
  IS_DEVELOPMENT: __DEV__,
};
```

### 2. Banner Ad Component (`src/components/BannerAd.tsx`)
- Handles ad loading, error states, and user interactions
- Includes debug information in development mode
- Supports custom ad unit IDs and banner sizes

### 3. Today Screen Integration (`src/screens/TodayScreen.tsx`)
- Banner ad is positioned at the bottom of the screen
- Automatically loads when the screen is displayed

## 🛠️ Setup Steps for Production

### Step 1: Create Google AdMob Account
1. Go to [Google AdMob](https://admob.google.com/)
2. Create a new account or sign in
3. Add your app to AdMob

### Step 2: Get Your App ID
1. In AdMob console, go to **Apps** → **Add App**
2. Select your platform (iOS/Android)
3. Copy the App ID (format: `ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX`)

### Step 3: Create Ad Units
1. Go to **Ad Units** → **Create Ad Unit**
2. Select **Banner** as the ad format
3. Copy the Ad Unit ID (format: `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX`)

### Step 4: Update Configuration
Replace the placeholder values in `src/config/ads.ts`:

```typescript
// Replace with your actual ad unit IDs
PRODUCTION_BANNER_AD_UNIT_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',

// Replace with your actual app IDs
APP_ID: {
  ANDROID: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',
  IOS: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',
},
```

### Step 5: Update Platform Configurations

#### Android (`android/app/src/main/AndroidManifest.xml`)
```xml
<meta-data
  android:name="com.google.android.gms.ads.APPLICATION_ID"
  android:value="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX" />
```

#### iOS (`ios/shrutam/Info.plist`)
```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX</string>
```

### Step 6: Test Your Implementation
1. Build and run your app
2. Check the console logs for ad loading status
3. Verify ads appear at the bottom of the Today screen

## 🧪 Testing

### Development Mode
- Uses test ad unit IDs automatically
- Shows debug information overlay
- Logs ad loading status to console

### Production Testing
1. Replace test ad unit IDs with production ones
2. Build release version of your app
3. Test on real devices (ads don't work in simulators)

## 📊 Ad Performance Monitoring

### Console Logs
The app logs ad events to help with debugging:
- `Banner ad loaded successfully`
- `Banner ad failed to load: [error]`
- `Banner ad opened`
- `Banner ad closed`

### AdMob Dashboard
- Monitor ad performance in the AdMob console
- View revenue, impressions, and click-through rates
- Analyze user engagement metrics

## 🔒 Privacy and Compliance

### GDPR Compliance
The banner ad component includes:
```typescript
requestOptions={{
  requestNonPersonalizedAdsOnly: true,
}}
```

### Privacy Policy
Ensure your app's privacy policy covers:
- Data collection by Google AdMob
- Third-party advertising networks
- User consent for personalized ads

## 🚨 Troubleshooting

### Common Issues

1. **Ads Not Loading**
   - Check internet connection
   - Verify ad unit IDs are correct
   - Ensure app is not in development mode with production ad units

2. **Build Errors**
   - Run `cd ios && pod install` for iOS
   - Clean and rebuild project
   - Check that all dependencies are properly linked

3. **Ad Display Issues**
   - Verify banner ad component is properly positioned
   - Check for layout conflicts with other UI elements
   - Ensure ad container has proper dimensions

### Debug Mode
In development, the banner ad shows debug information:
- Ad loading status
- Error messages
- Ad unit ID being used

## 📈 Next Steps

### Additional Ad Formats
Consider implementing:
- **Interstitial Ads**: Full-screen ads between app screens
- **Rewarded Ads**: Video ads that reward users
- **Native Ads**: Custom-styled ads that match your app's design

### Advanced Features
- **Ad Targeting**: Implement user segmentation
- **A/B Testing**: Test different ad placements
- **Analytics Integration**: Track ad performance with your analytics

## 📝 Notes

- **Test Ads**: Always use test ad unit IDs during development
- **Production**: Replace test IDs with production ones before release
- **App Store**: Ensure your app complies with App Store and Google Play ad policies
- **User Experience**: Balance ad revenue with user experience

## 🔗 Resources

- [Google Mobile Ads Documentation](https://developers.google.com/admob/react-native)
- [AdMob Console](https://admob.google.com/)
- [React Native Google Mobile Ads](https://github.com/react-native-google-mobile-ads/react-native-google-mobile-ads)
