// Placeholder for LiveSync (real-time data synchronization) logic
// This would typically involve WebSockets, server-sent events, or a polling mechanism
// to receive live updates from various platforms or a backend service.

import { ChatLog, Platform } from '../types';

let currentSessionId: string | null = null;
let listeners: ((chat: ChatLog) => void)[] = [];
let dummyChatLog: ChatLog[] = [];

// Simulate receiving live chat data
const startDummyLiveSync = (sessionId: string) => {
  if (currentSessionId === sessionId) return;

  currentSessionId = sessionId;
  console.log(`[LiveSync] Starting dummy live sync for session: ${sessionId}`);

  // Clear previous dummy chats for new session
  dummyChatLog = [];

  // Simulate receiving new chat messages every few seconds
  const platforms: Platform[] = ['YouTube', 'Twitch', 'TikTok'];
  const users = ['Observer1', 'Viewer2', 'Fan3', 'StreamerBot'];
  const messages = ['Hello everyone!', 'Nice to be here!', 'What a great stream!', 'Keep it up!'];

  setInterval(() => {
    if (!currentSessionId) return;

    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const user_name = users[Math.floor(Math.random() * users.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];

    const newChat: ChatLog = {
      id: String(Date.now()),
      user_name,
      message,
      platform,
      created_at: new Date(),
    };
    dummyChatLog.push(newChat);
    listeners.forEach(listener => listener(newChat));
    console.log('[LiveSync] Received new dummy chat:', newChat.message);
  }, 3000); // Receive new chat every 3 seconds
};

/**
 * ライブ同期の購読を開始します。
 * @param sessionId セッションID
 * @param onNewChat 新しいチャットを受信したときに呼び出されるコールバック
 */
export const subscribeToLiveSync = (sessionId: string, onNewChat: (chat: ChatLog) => void) => {
  startDummyLiveSync(sessionId); // Ensure dummy sync is running for this session
  listeners.push(onNewChat);
  console.log(`[LiveSync] Subscribed to live sync for session: ${sessionId}`);
};

/**
 * ライブ同期の購読を解除します。
 * @param onNewChat 購読解除するコールバック
 */
export const unsubscribeFromLiveSync = (onNewChat: (chat: ChatLog) => void) => {
  listeners = listeners.filter(listener => listener !== onNewChat);
  if (listeners.length === 0) {
    currentSessionId = null;
    console.log('[LiveSync] All listeners unsubscribed, stopping dummy sync.');
    // In a real app, you would stop the WebSocket connection here
  }
  console.log('[LiveSync] Unsubscribed from live sync.');
};

/**
 * 現在のセッションの全てのチャットログを取得します。
 * これは主に初期ロード時やリフレッシュ時に使用されます。
 * @returns チャットログの配列
 */
export const getLiveChatLogs = (): ChatLog[] => {
  return [...dummyChatLog].sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
};
