import { ChatLog, Platform } from '../types';

let chatLogs: ChatLog[] = [
  {
    id: '1',
    user_name: 'Alice',
    message: 'Hello from YouTube!',
    platform: 'YouTube',
    created_at: new Date(Date.now() - 50000),
  },
  {
    id: '2',
    user_name: 'Bob',
    message: 'Hi there, Twitch!',
    platform: 'Twitch',
    created_at: new Date(Date.now() - 40000),
  },
  {
    id: '3',
    user_name: 'Charlie',
    message: 'TikTok is awesome!',
    platform: 'TikTok',
    created_at: new Date(Date.now() - 30000),
  },
    {
    id: '4',
    user_name: 'David',
    message: "Let's go!",
    platform: 'YouTube',
    created_at: new Date(Date.now() - 20000),
  },
];

// NOTE: 実際のアプリケーションでは、ここにWebSocketやサーバーからのポーリング処理を実装し、
// リアルタイムでチャットログを更新します。

/**
 * 現在のチャットログの全件を `created_at` の昇順で取得します。
 * @returns チャットログの配列
 */
export const getChatLogs = (): ChatLog[] => {
  return [...chatLogs].sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
};

/**
 * 新しいチャットをチャットログに追加します。
 * @param chatLog 追加する新しいチャットオブジェクト
 */
export const addChatLog = (chatLog: ChatLog): void => {
    chatLogs.push(chatLog);
    // NOTE: UI側でこの変更を検知するために、コールバックや状態管理ライブラリとの連携が必要です。
};

// --- ダミーデータ生成（デモ用） ---
// 5秒ごとに新しいメッセージをランダムに追加して、リアルタイム感をシミュレートします。
const platforms: Platform[] = ['YouTube', 'Twitch', 'TikTok'];
const users = ['Eva', 'Frank', 'Grace', 'Heidi'];
const messages = ['Wow!', 'Nice!', 'Awesome stream!', 'GGs', 'LOL'];

setInterval(() => {
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
    addChatLog(newChat);
    console.log('[ChatEngine] Added a new dummy chat log from', platform);
}, 5000);
