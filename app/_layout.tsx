// app/_layout.tsx

import { Stack } from 'expo-router'; // Redirectは不要
import { Text, View } from 'react-native';
import { useAuthStore } from '../utils/authStore'; 
import { useHydration } from '../utils/useHydration'; 
import '../global.css'; // Tailwind CSSのインポート

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();
  const isHydrated = useHydration();

  // 1. ロード中（ハイドレーション待ち）: データ読み込みが終わるまで待機
  if (!isHydrated) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>LiveSync Hub をロード中...</Text>
        </View>
      ); 
  }

  // 2. ロード完了後、Stack.Protectedで認証状態を制御
  // Stack.ProtectedがisLoggedInの状態を見て、自動的にリダイレクトを処理します。
  return (
    <Stack>
      {/* ---------------------------------------------------- */}
      {/* 🔐 認証フロー制御 */}
      {/* ---------------------------------------------------- */}
      
      {/* 1. 未認証ゾーン (ログイン画面) */}
      {/* guard={!isLoggedIn} : 未ログイン (true) の場合のみアクセス許可 */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* 2. 認証済みゾーン (アプリ本体) */}
      {/* guard={isLoggedIn} : ログイン済み (true) の場合のみアクセス許可 */}
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* その他、共通でアクセス可能な画面 (例: about) */}
      <Stack.Screen name="about" />
    </Stack>
  );
}