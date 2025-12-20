import * as SecureStore from 'expo-secure-store';

/**
 * 指定されたキーで値を安全に保存します。
 * @param key 保存する値のキー
 * @param value 保存する値
 */
export async function saveItem(key: string, value: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`[Storage] Failed to save item for key "${key}":`, error);
  }
}

/**
 * 指定されたキーの値を取得します。
 * @param key 取得する値のキー
 * @returns 取得した値。見つからない場合は null。
 */
export async function getItem(key: string): Promise<string | null> {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.error(`[Storage] Failed to get item for key "${key}":`, error);
    return null;
  }
}

/**
 * 指定されたキーの値を削除します。
 * @param key 削除する値のキー
 */
export async function deleteItem(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`[Storage] Failed to delete item for key "${key}":`, error);
  }
}
