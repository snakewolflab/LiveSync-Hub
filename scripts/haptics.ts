import * as Haptics from 'expo-haptics';

/**
 * 新着メッセージ受信時など、軽い通知のための微細な振動を発生させます。
 */
export const triggerNotificationHaptic = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

/**
 * アクション成功時など、ユーザーに明確なフィードバックを返すための振動を発生させます。
 */
export const triggerSuccessHaptic = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};
