import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
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

export default function IntegratedChatScreen() {
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const prevChatCountRef = useRef(chatLogs.length);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = getChatLogs();
      setChatLogs(newLogs);
    }, 1000); // 1秒ごとにチャットを取得

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
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={chatLogs}
        renderItem={({ item }) => <ChatMessage item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        style={styles.list}
      />
      <View style={styles.footer}>
        <Link href="/event" asChild>
          <TouchableOpacity style={styles.eventButton}>
            <Text style={styles.eventButtonText}>参加型イベントはこちら</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  messageContent: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  eventButton: {
    backgroundColor: Colors.common.color1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  eventButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});