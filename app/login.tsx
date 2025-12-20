import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';
import { startAuth } from '@/scripts/auth-fetch';
import { Platform } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

const AuthButton = ({ platform, color, onPress, disabled }: { platform: string; color: string; onPress: () => void; disabled?: boolean }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress} disabled={disabled}>
    <Text style={styles.buttonText}>Login with {platform}</Text>
  </TouchableOpacity>
);

export default function LoginScreen() {
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const handleLogin = async (platform: Platform) => {
    setIsLoggingIn(true);
    try {
      // In a real app, startAuth would return a real token from the provider.
      await startAuth(platform);
      
      // For now, we simulate a successful login and create a dummy token.
      const dummyToken = `dummy-token-for-${platform}-${Date.now()}`;
      await login(dummyToken);

      // The redirection will be handled automatically by the RootLayout.
    } catch (error) {
      console.error(error);
      setIsLoggingIn(false);
    }
    // No need to setIsLoggingIn(false) on success because the screen will unmount.
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={[Colors.common.color1, Colors.common.color2]}
        style={StyleSheet.absoluteFill}
      />
      {isLoggingIn ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to LiveSync Hub</Text>
          <Text style={styles.subtitle}>
            Connect your accounts to get started.
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
              color="rgba(0, 0, 0, 0.8)"
              onPress={() => handleLogin('tiktok')}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
