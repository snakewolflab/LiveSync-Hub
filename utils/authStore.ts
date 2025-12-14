// utils/authStore.ts

// SecureStore は今回はインポート不要（使用しないため）
// import * as SecureStore from 'expo-secure-store'; 
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// ----------------------------------------------------
// 【修正】インメモリストレージの定義
// ----------------------------------------------------
// persist の振る舞いを保ちつつ、実際には何も保存しないストレージを定義
const ephemeralStorage = {
  setItem: (name: string, value: string) => {
    // 開発中はストレージに何も保存しない
    // console.log(`[DEV] Skipping persistence for: ${name}`); 
  },
  getItem: (name: string) => {
    // 常に null または undefined を返すことで、データがない状態をシミュレート
    return null; 
  },
  removeItem: (name: string) => {},
};

interface AuthState {
  isLoggedIn: boolean;
  userToken: string | null; 
  
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userToken: null,

      login: (token) => set({ isLoggedIn: true, userToken: token }),
      logout: () => set({ isLoggedIn: false, userToken: null }),
    }),
    {
      name: 'liveSyncHub-auth-storage',
      // 【変更点】 SecureStore の代わりに ephemeralStorage を使用
      storage: createJSONStorage(() => ephemeralStorage), 
    }
  )
);