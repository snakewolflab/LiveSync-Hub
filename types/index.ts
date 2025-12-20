export type Platform = 'YouTube' | 'Twitch' | 'TikTok';

export interface Channel {
  id: string;
  platform: Platform;
  name: string;
  icon_url?: string;
}

export interface ChatLog {
  id: string;
  user_name: string;
  message: string;
  platform: Platform;
  created_at: Date;
}
