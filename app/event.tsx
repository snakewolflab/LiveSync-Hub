import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';
import { sendGameEvent, GameType } from '@/scripts/games';

const GameButton = ({ title, color, onPress }: { title: string; color: string; onPress: () => void }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function EventScreen() {
  const handleGameEvent = async (gameType: GameType) => {
    const payload = {
      eventType: gameType,
      choice: 'A', // ダミーの選択肢
      userId: 'user-123', // ダミーのユーザーID
    };
    const result = await sendGameEvent(payload);
    if (result.success) {
      Alert.alert('Action Sent!', `Your "${gameType}" action has been sent.`);
    } else {
      Alert.alert('Error', 'Failed to send the action.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Live Events' }} />
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
