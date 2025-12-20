import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';
import { startAuth } from '@/scripts/auth-fetch';
import { Platform } from '@/types';

const AuthButton = ({ platform, color, onPress }: { platform: string; color: string; onPress: () => void }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.buttonText}>Login with {platform}</Text>
  </TouchableOpacity>
);

export default function LoginScreen() {
  const handleLogin = async (platform: Platform) => {
    try {
      await startAuth(platform);
      // 実際のアプリでは、成功後に画面遷移などの処理が入る
      Alert.alert('Login Success (Dummy)', `Successfully initiated login for ${platform}. Check console for details.`);
    } catch (error) {
      Alert.alert('Login Error', `An error occurred during login for ${platform}.`);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />
      <Text style={styles.title}>Connect Your Accounts</Text>
      <Text style={styles.subtitle}>
        Login to sync chats from your favorite platforms.
      </Text>
      <View style={styles.buttonContainer}>
        <AuthButton
          platform="YouTube"
          color={Colors.common.color1}
          onPress={() => handleLogin('youtube')}
        />
        <AuthButton
          platform="Twitch"
          color={Colors.common.color2}
          onPress={() => handleLogin('twitch')}
        />
        <AuthButton
          platform="TikTok"
          color="#000000" // TikTok has a black brand color
          onPress={() => handleLogin('tiktok')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
