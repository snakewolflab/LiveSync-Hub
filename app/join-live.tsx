import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function JoinLiveScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const insets = useSafeAreaInsets(); // Get insets

  const handleJoin = () => {
    if (code.trim().length === 0) {
      // Simple validation
      return;
    }
    // Navigate to the session screen with params
    router.push({
      pathname: '/session',
      params: { mode: 'Live', roomName: code }, // Pass mode and room name
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={[Colors.common.color1, Colors.common.color2]}
        style={StyleSheet.absoluteFill}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}>
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.backward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <IconSymbol name="play.display" size={60} color="#fff" />
          <Text style={styles.title}>Liveモードに参加</Text>
          <TextInput
            style={styles.input}
            placeholder="Live参加コードを入力"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={code}
            onChangeText={setCode}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
            <Text style={styles.joinButtonText}>参加する</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },
  backButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  joinButton: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  joinButtonText: {
    color: Colors.common.color1,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
