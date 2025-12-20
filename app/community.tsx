import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { fetchCommunityPosts, likeCommunityPost } from '@/scripts/firestore';

interface CommunityPost {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
}

const CommunityPostCard = ({ post }: { post: CommunityPost }) => {
  const handleLike = async () => {
    const success = await likeCommunityPost(post.id);
    if (success) {
      // In a real app, you'd update the UI to reflect the new like count
      Alert.alert("Like!", `${post.author}さんの投稿にいいねしました！`);
    }
  };

  return (
    <View style={styles.postCard}>
      <Text style={styles.postAuthor}>{post.author}</Text>
      <Text style={styles.postContent}>{post.content}</Text>
      <View style={styles.postActions}>
        <Text style={styles.postTimestamp}>{post.timestamp.toLocaleString()}</Text>
        <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
          <IconSymbol name="hand.thumbsup.fill" size={16} color={Colors.common.color1} />
          <Text style={styles.likeCount}>{post.likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function CommunityScreen() {
  const router = useRouter();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets(); // Get insets

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const fetchedPosts = await fetchCommunityPosts();
      setPosts(fetchedPosts);
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={[Colors.common.color1, Colors.common.color2]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.backward" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>コミュニティ</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {isLoading ? (
          <Text style={styles.loadingText}>投稿を読み込み中...</Text>
        ) : (
          <>
            <View style={styles.snsLinksCard}>
              <Text style={styles.snsTitle}>配信者・作品 公式SNS</Text>
              <View style={styles.snsButtons}>
                <TouchableOpacity style={styles.snsButton}>
                  <IconSymbol name="network" size={24} color={Colors.common.color1} />
                  <Text style={styles.snsButtonText}>Webサイト</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.snsButton}>
                  <IconSymbol name="text.bubble" size={24} color={Colors.common.color1} />
                  <Text style={styles.snsButtonText}>掲示板</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.snsButton}>
                  <IconSymbol name="link" size={24} color={Colors.common.color1} />
                  <Text style={styles.snsButtonText}>その他</Text>
                </TouchableOpacity>
              </View>
            </View>

            {posts.map((post) => (
              <CommunityPostCard key={post.id} post={post} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollViewContent: {
    padding: 15,
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  snsLinksCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  snsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  snsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  snsButton: {
    alignItems: 'center',
    padding: 5,
  },
  snsButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  postCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  postAuthor: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.common.color1,
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  postTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 5,
    fontSize: 14,
    color: Colors.common.color1,
    fontWeight: 'bold',
  },
});
