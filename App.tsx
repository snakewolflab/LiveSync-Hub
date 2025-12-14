// App.tsx または _layout.tsx

import { Stack } from 'expo-router';
import { Text } from 'react-native'; // <Text> を使うためのインポート
import { useAuthStore } from './utils/authStore';
import { useHydration } from './utils/useHydration'; // ★ 新しいフックをインポート

import './global.css';

export default function RootLayout() {
  // 認証状態の取得
  const { isLoggedIn } = useAuthStore();
  
  // ★ 修正点: カスタムフックを使ってハイドレーション状態を取得
  const isHydrated = useHydration(); 

  // --- ロード中画面の表示 ---
  if (!isHydrated) {
      // ローディング画面を表示
      return (
        <Text style={{ flex: 1, textAlign: 'center', paddingTop: 100 }}>
          LiveSync Hub をロード中...
        </Text>
      ); 
  }
  // -------------------------

  return (
    <Stack>
      {/* 認証フロー制御（Protected Routes）のロジックはそのまま */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Screen name="about" />
    </Stack>
  );
}