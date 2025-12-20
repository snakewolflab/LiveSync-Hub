import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics'; // Import Haptics
import { ChatLog, Platform as PlatformType } from '@/types';
import { subscribeToLiveSync, unsubscribeFromLiveSync, getLiveChatLogs } from '@/scripts/livesync';
import { scheduleOngoingNotification, cancelOngoingNotification } from '@/scripts/notifications';
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
  const flatListRef = useRef<FlatList<ChatLog>>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);
  const userScrolledAwayRef = useRef(false);

  // --- LiveSync Integration ---
  useLayoutEffect(() => {
    // Initial load of chat logs
    setChatLogs(getLiveChatLogs());

    const onNewChat = (newChat: ChatLog) => {
      setChatLogs((prevLogs) => {
        const updatedLogs = [...prevLogs, newChat];
        if (!userScrolledAwayRef.current) { // Only auto-scroll if user is at the bottom or hasn't scrolled away
          flatListRef.current?.scrollToEnd({ animated: true });
        } else {
          setShowScrollToBottomButton(true); // Show button if new messages arrive and user scrolled up
        }
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); // Haptic feedback for new message
        return updatedLogs;
      });
    };

    subscribeToLiveSync(roomName || 'default', onNewChat); // Subscribe to live updates

    // Schedule ongoing notification
    scheduleOngoingNotification(mode || '不明', roomName || '不明な部屋');

    return () => {
      unsubscribeFromLiveSync(onNewChat); // Unsubscribe on unmount
      cancelOngoingNotification(); // Cancel notification on unmount
    };
  }, [mode, roomName]);

  // --- Scroll Logic ---
  const handleScroll = useCallback((event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isCloseToBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 50; // 50px threshold
    
    if (userScrolledAwayRef.current && isCloseToBottom) {
      userScrolledAwayRef.current = false;
      setShowScrollToBottomButton(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Haptic feedback on reaching bottom
    } else if (!isCloseToBottom) {
      userScrolledAwayRef.current = true;
    }
  }, []);

  const handleScrollEndDrag = useCallback(() => {
    // User finished scrolling
    setIsUserScrolling(false);
  }, []);

  const handleScrollBeginDrag = useCallback(() => {
    // User started scrolling
    setIsUserScrolling(true);
  }, []);

  const scrollToBottom = useCallback(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); // Haptic feedback on button press
    setShowScrollToBottomButton(false);
    userScrolledAwayRef.current = false;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#333', Colors.common.color1]} style={StyleSheet.absoluteFill} />
      
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
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        extraData={chatLogs.length} // Optimize re-renders
      />

      {showScrollToBottomButton && (
        <TouchableOpacity style={styles.scrollToBottomButton} onPress={scrollToBottom}>
          <IconSymbol name="arrow.down.circle.fill" size={30} color={Colors.common.color2} />
        </TouchableOpacity>
      )}
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
  scrollToBottomButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
