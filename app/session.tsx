import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatLog, Platform as PlatformType } from '@/types';
import { getChatLogs } from '@/scripts/chat-engine';
import { triggerNotificationHaptic } from '@/scripts/haptics';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

const platformIcons: Record<PlatformType, { name: string; color: string }> = {
  YouTube: { name: 'play.rectangle.fill', color: '#FF0000' },
  Twitch: { name: 'gamecontroller.fill', color: '#6441A5' },
  TikTok: { name: 'music.note', color: '#000000' },
};

const ChatMessage = React.memo(({ item }: { item: ChatLog }) => {
  const iconInfo = platformIcons[item.platform];
  return (
    <View style={styles.messageContainer}>
      <IconSymbol name={iconInfo.name} color={iconInfo.color} size={20} />
      <View style={styles.messageContent}>
        <Text style={styles.userName}>{item.user_name}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </View>
  );
});

export default function SessionScreen() {
  const router = useRouter();
  const { mode, roomName } = useLocalSearchParams<{ mode: string; roomName: string }>();
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const prevChatCountRef = useRef(chatLogs.length);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = getChatLogs();
      setChatLogs(newLogs);
    }, 1000); // 1-second polling for new chats

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatLogs.length > prevChatCountRef.current) {
      triggerNotificationHaptic();
      flatListRef.current?.scrollToEnd({ animated: true });
    }
    prevChatCountRef.current = chatLogs.length;
  }, [chatLogs]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#333', '#111']} style={StyleSheet.absoluteFill} />
      
      <View style={styles.sessionHeader}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.backButton}>
          <IconSymbol name="xmark" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.modeText}>現在のモード: {mode}</Text>
          <Text style={styles.roomText}>接続部屋: {roomName}</Text>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={chatLogs}
        renderItem={({ item }) => <ChatMessage item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        style={styles.list}
      />
      {/* Footer for actions can be added here if needed */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backButton: {
    padding: 5,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  modeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  roomText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  list: {
    flex: 1,
  },
  listContentContainer: {
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 5,
  },
  messageContent: {
    marginLeft: 10,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 10,
  },
  userName: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
});
