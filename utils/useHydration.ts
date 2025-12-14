import { useState, useEffect } from 'react';
import { useAuthStore } from './authStore'; 

/**
 * 従来のZustandのハイドレーションチェック
 * persistの初期化が完了するまで待機します。
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // 従来のpersistミドルウェアは、初回レンダリング後にハイドレーションを開始します。
    // hasHydrated() が true を返すまで待ちます。
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    // 既にハイドレーションが完了している場合は即座に true を設定
    if (useAuthStore.persist.hasHydrated()) {
        setIsHydrated(true);
    }

    return () => {
      // アンマウント時に購読を解除
      unsub();
    };
  }, []);

  return isHydrated;
}