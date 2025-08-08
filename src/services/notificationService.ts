import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

/**
 * Notification Service
 * Provides methods to handle local notifications for both iOS and Android
 */
class NotificationService {
  /**
   * Show a local notification immediately
   */
  showLocalNotification(
    title: string,
    message: string,
    data?: any,
    channelId: string = 'shrutam-channel-id'
  ) {
    PushNotification.localNotification({
      channelId,
      title,
      message,
      data,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
    });
  }

  /**
   * Schedule a local notification for a specific date/time
   */
  scheduleLocalNotification(
    title: string,
    message: string,
    date: Date,
    data?: any,
    channelId: string = 'shrutam-channel-id'
  ) {
    PushNotification.localNotificationSchedule({
      channelId,
      title,
      message,
      date,
      data,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
      allowWhileIdle: true, // Allow notification even when device is in doze mode
    });
  }

  /**
   * Schedule a daily notification at a specific time
   */
  scheduleDailyNotification(
    title: string,
    message: string,
    hour: number,
    minute: number,
    data?: any,
    channelId: string = 'shrutam-channel-id'
  ) {
    const now = new Date();
    const scheduledDate = new Date();
    scheduledDate.setHours(hour, minute, 0, 0);

    // If the time has already passed today, schedule for tomorrow
    if (scheduledDate <= now) {
      scheduledDate.setDate(scheduledDate.getDate() + 1);
    }

    PushNotification.localNotificationSchedule({
      channelId,
      title,
      message,
      date: scheduledDate,
      data,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
      allowWhileIdle: true,
      repeatType: 'day', // Repeat daily
    });
  }

  /**
   * Cancel all scheduled notifications
   */
  cancelAllNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }

  /**
   * Cancel a specific notification by ID
   */
  cancelNotification(notificationId: string) {
    PushNotification.cancelLocalNotifications({ id: notificationId });
  }

  /**
   * Get all scheduled notifications
   */
  getScheduledNotifications(callback: (notifications: any[]) => void) {
    PushNotification.getScheduledLocalNotifications(callback);
  }

  /**
   * Set the application badge number (iOS only)
   */
  setBadgeNumber(number: number) {
    PushNotification.setApplicationIconBadgeNumber(number);
  }

  /**
   * Get the current badge number (iOS only)
   */
  getBadgeNumber(callback: (number: number) => void) {
    if (Platform.OS === 'ios') {
      PushNotification.getApplicationIconBadgeNumber(callback);
    }
  }

  /**
   * Check notification permissions
   */
  checkPermissions(callback: (permissions: { alert: boolean; badge: boolean; sound: boolean }) => void) {
    PushNotification.checkPermissions(callback);
  }

  /**
   * Request notification permissions
   */
  requestPermissions() {
    PushNotification.requestPermissions();
  }
}

// Export a singleton instance
export default new NotificationService();
