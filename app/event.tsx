import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';
import { sendGameEvent, GameType } from '@/scripts/games';
import { IconSymbol } from '@/components/ui/icon-symbol';

const GameButton = ({ title, color, onPress }: { title: string; color: string; onPress: () => void }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function EventScreen() {
  const router = useRouter();

  const handleGameEvent = async (gameType: GameType) => {
    const payload = {
      eventType: gameType,
      choice: 'A', // Dummy choice
      userId: 'user-123', // Dummy user ID
    };
    const result = await sendGameEvent(payload);
    if (result.success) {
      Alert.alert('Action Sent!', `Your "${gameType}" action has been sent.`);
    } else {
      Alert.alert('Error', 'Failed to send the action.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.common.color2, Colors.common.color1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.backward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Participate in Live Events</Text>
        <Text style={styles.subtitle}>
          Engage with the stream in real-time!
        </Text>
        <View style={styles.buttonContainer}>
          <GameButton
            title="Vote"
            color={Colors.common.color1}
            onPress={() => handleGameEvent('poll')}
          />
          <GameButton
            title="Answer Quiz"
            color={Colors.common.color2}
            onPress={() => handleGameEvent('quiz')}
          />
          <GameButton
            title="Send Reaction"
            color="#333"
            onPress={() => handleGameEvent('reaction')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    paddingTop: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
