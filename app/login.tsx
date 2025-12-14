// 以下のコードで試す
import { View, Text, TouchableOpacity } from 'react-native'; 
import { useAuthStore } from '../utils/authStore'; 

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);
  
  const handleLogin = () => {
    login('dummy-token-123'); 
  };

  return (
    <View className="flex-1 items-center justify-center p-5 bg-white">
      <Text className="text-2xl font-bold mb-8">LiveSync Hub ログイン</Text>
      
      {/* 🌟 重要なポイント：activeOpacity={0.8} のようなブール値以外のプロパティは残す 🌟 */}
      <TouchableOpacity 
        onPress={handleLogin}
        className="bg-blue-600 px-8 py-3 rounded-md shadow-md active:bg-blue-700 w-40 items-center"
        activeOpacity={0.8} // これは数値なのでOK
      >
        <Text className="text-white text-lg font-semibold">
          ログイン
        </Text>
      </TouchableOpacity>
    </View>
  );
}