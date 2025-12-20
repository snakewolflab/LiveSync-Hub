import { triggerSuccessHaptic } from './haptics';

export type GameType = 'poll' | 'quiz' | 'reaction';

interface GameEventPayload {
  eventType: GameType;
  choice: string | number; // 投票の選択肢ID、クイズの回答IDなど
  userId: string;
}

// NOTE: 実際のアプリケーションでは、ここにFirestoreや自前のWebSocketサーバーとの
// 通信ロジック（データの送信・同期）を実装します。

/**
 * 参加型イベントのアクションをサーバーに送信します。
 * @param payload 送信するイベントのデータ
 */
export const sendGameEvent = async (payload: GameEventPayload): Promise<{ success: boolean }> => {
  console.log('[Games] Sending event to server:', payload);

  // --- サーバーへの送信処理（ダミー） ---
  // サーバーへの送信をシミュレートするための待機時間
  await new Promise(resolve => setTimeout(resolve, 500));
  // 常に成功したと仮定する
  const isSuccess = true;
  // --- ここまで ---

  if (isSuccess) {
    console.log('[Games] Event sent successfully.');
    // 成功フィードバックとしてハプティクスをトリガー
    triggerSuccessHaptic();
    return { success: true };
  } else {
    console.error('[Games] Failed to send event.');
    return { success: false };
  }
};
