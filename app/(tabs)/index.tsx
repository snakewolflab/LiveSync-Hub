import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { startWaitingForRoomConnection } from '@/scripts/rooms';

// --- Mode Card Component ---

type ModeCardProps = {
  title: string;
  description: string;
  icon: React.ComponentProps<typeof IconSymbol>['name'];
  href?: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean; // New prop for loading state
};

const ModeCard = ({ title, description, icon, href, onPress, disabled, isLoading }: ModeCardProps) => {
  const cardContent = (
    <View style={[styles.modeCard, disabled && styles.disabledCard]}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.common.color1} />
      ) : (
        <IconSymbol name={icon} size={32} color={disabled ? '#999' : Colors.common.color1} />
      )}
      <Text style={[styles.modeTitle, disabled && styles.disabledText]}>{title}</Text>
      <Text style={[styles.modeDescription, disabled && styles.disabledText]}>{description}</Text>
    </View>
  );

  if (disabled && !onPress) { // If disabled and no onPress, it's just static content
    return cardContent;
  }

  // If there's an href, use Link
  if (href) {
    return (
      <Link href={href} asChild>
        <TouchableOpacity disabled={disabled}>{cardContent}</TouchableOpacity>
      </Link>
    );
  }
  // Otherwise, use TouchableOpacity with onPress
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      {cardContent}
    </TouchableOpacity>
  );
};


// --- Main Screen ---

export default function DashboardScreen() {
  const { logout } = useAuth();
  const userName = "Guest"; // Dummy user name
  const [isConnectingToRoom, setIsConnectingToRoom] = useState(false);

  const handleVenueMode = async () => {
    setIsConnectingToRoom(true);
    const dummyRoomId = "venue-123"; // Dummy room ID
    const connected = await startWaitingForRoomConnection(dummyRoomId);
    if (connected) {
      Alert.alert("接続成功", `会場 ${dummyRoomId} に接続しました。`);
      // Optionally navigate to a waiting room or session screen
      // router.push({ pathname: '/session', params: { mode: 'Venue', roomName: dummyRoomId } });
    } else {
      Alert.alert("接続失敗", `会場 ${dummyRoomId} への接続に失敗しました。`);
    }
    setIsConnectingToRoom(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.common.color1, Colors.common.color2]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LiveSync Hub</Text>
        <Text style={styles.welcomeText}>ようこそ、{userName}さん</Text>
      </View>
      
      <View style={styles.content}>
        <ModeCard
          title="Liveモード"
          description="Live参加コードを入力"
          icon="play.display"
          href="/join-live"
        />
        <ModeCard
          title="会場モード"
          description={isConnectingToRoom ? "接続待機中..." : "会場アクセス端末の接続待機中"}
          icon="dot.radiowaves.up.forward"
          onPress={handleVenueMode}
          isLoading={isConnectingToRoom}
          disabled={isConnectingToRoom}
        />
        <ModeCard
          title="Normalモード"
          description="動画コードを入力"
          icon="film"
          href="/join-normal"
        />
        <ModeCard
          title="コミュニティ"
          description="配信者・作品のファン空間"
          icon="person.3.fill"
          href="/community"
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>ログアウト</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  disabledCard: {
    backgroundColor: 'rgba(200, 200, 200, 0.7)',
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  modeDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  disabledText: {
    color: '#999',
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});