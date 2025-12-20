import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatLog, Platform as PlatformType } from '@/types';
import { getChatLogs } from '@/scripts/chat-engine';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';

const platformIcons: Record<PlatformType, { name: string; color: string }> = {
  YouTube: { name: 'play.rectangle.fill', color: '#FF0000' },
  Twitch: { name: 'gamecontroller.fill', color: '#6441A5' },
  TikTok: { name: 'music.note', color: '#000000' },
};

// --- Dashboard Components ---

const DashboardCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const ConnectionStatus = () => (
  <DashboardCard title="Connection Status">
    <View style={styles.statusContainer}>
      {Object.entries(platformIcons).map(([platform, icon]) => (
        <View key={platform} style={styles.statusItem}>
          <IconSymbol name={icon.name} color={icon.color} size={24} />
          <Text style={styles.statusText}>Connected</Text>
        </View>
      ))}
    </View>
  </DashboardCard>
);

const ActiveEvents = () => (
  <DashboardCard title="Active Events">
    <Link href="/event" asChild>
      <TouchableOpacity style={styles.eventButton}>
        <Text style={styles.eventButtonText}>Go to Event Screen</Text>
      </TouchableOpacity>
    </Link>
  </DashboardCard>
);

const ChatPreview = () => {
  const [latestChats, setLatestChats] = useState<ChatLog[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const allLogs = getChatLogs();
      setLatestChats(allLogs.slice(-3)); // Get latest 3
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardCard title="Chat Preview">
      {latestChats.length > 0 ? latestChats.map((chat) => (
        <View key={chat.id} style={styles.chatItem}>
          <IconSymbol name={platformIcons[chat.platform].name} color={platformIcons[chat.platform].color} size={16} />
          <Text style={styles.chatText} numberOfLines={1}>
            <Text style={{fontWeight: 'bold'}}>{chat.user_name}:</Text> {chat.message}
          </Text>
        </View>
      )) : <Text>No new messages.</Text>}
    </DashboardCard>
  );
};

const AccountCard = () => {
  const { logout } = useAuth();
  return (
    <DashboardCard title="Account">
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </DashboardCard>
  );
};


// --- Main Screen ---

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.common.color1, Colors.common.color2]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.headerTitle}>LiveSync Hub</Text>
          <ConnectionStatus />
          <ActiveEvents />
          <ChatPreview />
          <AccountCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusItem: {
    alignItems: 'center',
  },
  statusText: {
    marginTop: 5,
    fontSize: 12,
    color: '#3cb371'
  },
  eventButton: {
    backgroundColor: Colors.common.color1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  eventButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  chatText: {
    marginLeft: 8,
    flexShrink: 1,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});