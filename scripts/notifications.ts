// Placeholder for Expo Notifications integration
// This script handles requesting permissions and scheduling/cancelling ongoing notifications.

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler for foreground notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/**
 * 通知パーミッションを要求します。
 * @returns 許可されたかどうか
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.warn('[Notifications] Notification permissions not granted!');
    Alert.alert("通知の許可", "固定通知を表示するためには通知の許可が必要です。");
    return false;
  }
  return true;
}

/**
 * 部屋滞在中に固定通知を表示します。
 * @param mode 現在のモード (Live, Normal, Venue)
 * @param roomName 接続中の部屋名/動画名/会場名
 */
export async function scheduleOngoingNotification(mode: string, roomName: string) {
  const permissionsGranted = await requestNotificationPermissions();
  if (!permissionsGranted) {
    return;
  }

  // Clear any existing ongoing notifications to prevent duplicates
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'LiveSync Hub',
      body: `${mode}モード: ${roomName}に接続中`,
      // Set to true to make it an ongoing notification (Android only)
      // This will keep the notification persistent in the notification shade.
      sticky: true,
      // For iOS, you might need to use background tasks or specific APIs
      // to keep the app active or present UI. This example focuses on Android's sticky notification.
    },
    trigger: null, // show notification immediately
    identifier: 'livesync-ongoing-notification', // Unique ID for this notification
  });
  console.log(`[Notifications] Ongoing notification scheduled for: ${mode} - ${roomName}`);
}

/**
 * 固定通知を解除します。
 */
export async function cancelOngoingNotification() {
  await Notifications.cancelScheduledNotificationAsync('livesync-ongoing-notification');
  console.log('[Notifications] Ongoing notification cancelled.');
}

/**
 * アプリ起動時に既存の通知をクリアするヘルパー関数
 */
export async function clearAllNotificationsOnAppStart() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log('[Notifications] Cleared all scheduled notifications on app start.');
}
