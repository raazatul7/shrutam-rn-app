/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Import push notification libraries
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

// Import Firebase messaging
import messaging from '@react-native-firebase/messaging';

// Request permission for Firebase messaging
messaging().requestPermission()
  .then(() => {
    console.log('✅ Firebase messaging permission granted');
    
    // Get the FCM token after permission is granted
    return messaging().getToken();
  })
  .then(token => {
    console.log('🔥 FCM TOKEN:', token);
    console.log('📱 Use this token to send test notifications from Firebase Console');
  })
  .catch((error) => {
    console.log('❌ Firebase messaging permission denied:', error);
  });

// Listen for token refresh
messaging().onTokenRefresh(token => {
  console.log('🔄 FCM TOKEN REFRESHED:', token);
});

// Handle when app is opened from a notification (when app was quit/killed)
messaging().getInitialNotification().then(remoteMessage => {
  if (remoteMessage) {
    console.log('🚀 App opened from notification when app was quit:', remoteMessage);
    // You can handle navigation or data processing here
  }
});

// Handle when app is opened from a notification (when app was in background)
messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('🚀 App opened from notification when app was in background:', remoteMessage);
  // You can handle navigation or data processing here
});

// Handle Firebase foreground messages
messaging().onMessage(async remoteMessage => {
  console.log('📨 Firebase foreground message received:', remoteMessage);
  
  // Create a local notification when app is in foreground
  // Firebase notifications don't show automatically when app is open
  if (remoteMessage.notification) {
    PushNotification.localNotification({
      channelId: 'shrutam-channel-id',
      title: remoteMessage.notification.title || 'New Message',
      message: remoteMessage.notification.body || 'You have a new message',
      data: remoteMessage.data || {},
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
      vibrate: true,
      ongoing: false,
      autoCancel: true,
      smallIcon: 'ic_notification', // Use our custom notification icon
      largeIcon: 'ic_launcher', // Use app icon as large icon
    });
    
    console.log('🔔 Created local notification for foreground Firebase message');
  }
});

// Handle Firebase background messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📨 Firebase background message received:', remoteMessage);
  
  // Create a local notification when app is in background
  // This ensures notifications show even when app is closed/minimized
  if (remoteMessage.notification || remoteMessage.data) {
    const title = remoteMessage.notification?.title || remoteMessage.data?.title || 'New Message';
    const body = remoteMessage.notification?.body || remoteMessage.data?.body || 'You have a new message';
    
    PushNotification.localNotification({
      channelId: 'shrutam-channel-id',
      title: title,
      message: body,
      data: remoteMessage.data || {},
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
      vibrate: true,
      ongoing: false,
      autoCancel: true,
      smallIcon: 'ic_notification', // Use our custom notification icon
      largeIcon: 'ic_launcher', // Use app icon as large icon
    });
    
    console.log('🔔 Created local notification for background Firebase message');
  }
  
  return Promise.resolve();
});

// Configure push notifications - MUST be outside of any component LifeCycle
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("📲 PUSH NOTIFICATION TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("🔔 NOTIFICATION RECEIVED:", notification);
    
    // Check if user tapped on the notification
    if (notification.userInteraction) {
      console.log('👆 User tapped on notification:', notification);
      // Handle notification tap - you can navigate to specific screens here
    }
    
    // Check if notification is in foreground
    if (notification.foreground) {
      console.log('📱 Notification received while app is in foreground');
    } else {
      console.log('📱 Notification received while app is in background');
    }

    // process the notification data
    if (notification.data) {
      console.log('📦 Notification data:', notification.data);
    }

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("⚡ ACTION:", notification.action);
    console.log("🔔 NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error('❌ REGISTRATION ERROR:', err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

// Create notification channel for Android
PushNotification.createChannel(
  {
    channelId: "shrutam-channel-id", // (required)
    channelName: "Shrutam Notifications", // (required)
    channelDescription: "Important notifications from Shrutam app", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    showBadge: true,
    visibility: 1, // Public visibility
  },
  (created) => console.log(`📱 Notification channel created: ${created}`) // (optional) callback returns whether the channel was created, false means it already existed.
);

// Check and request notification permissions
function requestNotificationPermissions() {
  console.log('🔍 Checking notification permissions...');
  
  PushNotification.checkPermissions((permissions) => {
    console.log('📋 Current notification permissions:', permissions);
    
    if (!permissions.alert) {
      console.log('⚠️ Notifications disabled - requesting permissions...');
      
      // Request permissions explicitly
      PushNotification.requestPermissions({
        alert: true,
        badge: true,
        sound: true,
      }).then((permissions) => {
        console.log('✅ Permission request result:', permissions);
      }).catch((error) => {
        console.log('❌ Permission request failed:', error);
      });
    } else {
      console.log('✅ Notifications already enabled!');
    }
  });
}

// Request permissions after a short delay to ensure app is fully loaded
setTimeout(() => {
  requestNotificationPermissions();
}, 1000);

// Test local notification to verify setup
console.log('🧪 Testing local notification system...');
setTimeout(() => {
  PushNotification.localNotification({
    channelId: 'shrutam-channel-id',
    title: '🎉 Welcome!',
    message: 'Thanks for installing Shrutam!',
    playSound: true,
    soundName: 'default',
    importance: 'high',
    priority: 'high',
    smallIcon: 'ic_notification', // Use our custom notification icon
    largeIcon: 'ic_launcher', // Use app icon as large icon
  });
  console.log('📱 Test notification sent');
}, 3000); // Wait 3 seconds after app loads

AppRegistry.registerComponent(appName, () => App);
