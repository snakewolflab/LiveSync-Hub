import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';

// --- Mode Card Component ---

type ModeCardProps = {
  title: string;
  description: string;
  icon: React.ComponentProps<typeof IconSymbol>['name'];
  href?: string;
  disabled?: boolean;
};

const ModeCard = ({ title, description, icon, href, disabled }: ModeCardProps) => {
  const cardContent = (
    <View style={[styles.modeCard, disabled && styles.disabledCard]}>
      <IconSymbol name={icon} size={32} color={disabled ? '#999' : Colors.common.color1} />
      <Text style={[styles.modeTitle, disabled && styles.disabledText]}>{title}</Text>
      <Text style={[styles.modeDescription, disabled && styles.disabledText]}>{description}</Text>
    </View>
  );

  if (disabled || !href) {
    return cardContent;
  }

  return (
    <Link href={href} asChild>
      <TouchableOpacity>{cardContent}</TouchableOpacity>
    </Link>
  );
};


// --- Main Screen ---

export default function DashboardScreen() {
  const { logout } = useAuth();
  const userName = "Guest"; // Dummy user name

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
          description="会場アクセス端末の接続待機中"
          icon="dot.radiowaves.up.forward"
          disabled
        />
        <ModeCard
          title="Normalモード"
          description="動画コードを入力"
          icon="film"
          href="/join-normal"
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