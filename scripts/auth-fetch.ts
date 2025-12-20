import * as AuthSession from 'expo-auth-session';
import { Platform } from 'react-native';
import { saveItem } from './storage';

// NOTE: 各プラットフォームの認証情報は、実際の開発で環境変数などから取得する必要があります。
const oAuthConfigs = {
  youtube: {
    // TODO: YouTubeの認証情報を設定
    clientId: 'YOUR_YOUTUBE_CLIENT_ID',
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  },
  twitch: {
    // TODO: Twitchの認証情報を設定
    clientId: 'YOUR_TWITCH_CLIENT_ID',
    authorizationEndpoint: 'https://id.twitch.tv/oauth2/authorize',
    tokenEndpoint: 'https://id.twitch.tv/oauth2/token',
    scopes: ['user:read:email'],
  },
  tiktok: {
    // TODO: TikTokの認証情報を設定
    // TikTokはOAuth 2.0の標準フローと異なる場合があるため、ドキュメントを要確認
    clientId: 'YOUR_TIKTOK_CLIENT_ID',
    authorizationEndpoint: 'https://www.tiktok.com/v2/auth/authorize/',
    tokenEndpoint: 'https://open-api.tiktok.com/oauth/access_token/',
    scopes: ['user.info.basic'],
  },
};

type Platform = 'youtube' | 'twitch' | 'tiktok';

/**
 * 指定されたプラットフォームでOAuth認証を開始します。
 * 成功すると、取得したトークンをSecureStoreに保存します。
 * @param platform 認証するプラットフォーム
 */
export const startAuth = async (platform: Platform): Promise<void> => {
  console.log(`[Auth] Starting authentication for ${platform}...`);

  const config = oAuthConfigs[platform];
  const redirectUri = AuthSession.makeRedirectUri({
    // For usage in bare and standalone
    native: `yourapp://redirect`,
  });

  const request = new AuthSession.AuthRequest({
    clientId: config.clientId,
    redirectUri,
    scopes: config.scopes,
    responseType: AuthSession.ResponseType.Code,
    // extraParams can be used for things like state in OAuth2
  });

  // promptAsync is the function that starts the auth flow
  const response = await request.promptAsync(
    { authorizationEndpoint: config.authorizationEndpoint }
  );

  if (response.type === 'success') {
    const { code } = response.params;
    console.log('[Auth] Authentication successful, received code:', code);

    // NOTE: 実際には、この認可コードをバックエンドに送信し、
    // バックエンドがアクセストークンと交換して、それをSecureStoreに保存します。
    // ここではダミーとして 'DUMMY_TOKEN' を保存します。
    await saveItem(`${platform}_auth_token`, 'DUMMY_TOKEN_FOR_' + platform);
    console.log(`[Auth] Dummy token for ${platform} saved.`);

  } else {
    console.warn('[Auth] Authentication failed or was cancelled.', response);
  }
};
