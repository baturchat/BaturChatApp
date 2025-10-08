import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../constants/theme';
import CopyrightFooter from '../../components/CopyrightFooter';

const { width } = Dimensions.get('window');

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar?: string;
  online: boolean;
  isTyping?: boolean;
}

export default function Chats() {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data dengan konten Indonesia
  useEffect(() => {
    const mockChats: Chat[] = [
      {
        id: '1',
        name: 'Budi Santoso',
        lastMessage: 'Hai, gimana kabarnya hari ini?',
        timestamp: '2 menit',
        unreadCount: 3,
        online: true,
        isTyping: true,
      },
      {
        id: '2',
        name: 'BaturChat Team',
        lastMessage: 'Selamat datang di BaturChat! 🎉',
        timestamp: '1 jam',
        unreadCount: 1,
        online: false,
      },
      {
        id: '3',
        name: 'Sari Dewi',
        lastMessage: 'Makasih ya kemarin udah bantuin',
        timestamp: 'Kemarin',
        unreadCount: 0,
        online: true,
      },
      {
        id: '4',
        name: 'Grup Keluarga',
        lastMessage: 'Mama: Jangan lupa makan siang ya',
        timestamp: '10:30',
        unreadCount: 5,
        online: false,
      },
      {
        id: '5',
        name: 'Ahmad Rizki',
        lastMessage: 'Kita ketemuan jam berapa?',
        timestamp: '09:15',
        unreadCount: 0,
        online: true,
      },
      {
        id: '6',
        name: 'Teman Kantor',
        lastMessage: 'Meeting jam 2 siang ya guys',
        timestamp: 'Senin',
        unreadCount: 2,
        online: false,
      },
    ];
    setChats(mockChats);
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const renderChatItem = ({ item, index }: { item: Chat; index: number }) => (
    <View
      style={[
        styles.chatItemContainer,
        { 
          marginBottom: index === filteredChats.length - 1 ? 100 : 0,
        }
      ]}
    >
      <BlurView intensity={20} style={styles.chatItem}>
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={[getAvatarColor(item.name), getAvatarColor(item.name) + '80']}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
          </LinearGradient>
          {item.online && <View style={styles.onlineIndicator} />}
        </View>

        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
          
          <View style={styles.messageRow}>
            <View style={styles.messageContainer}>
              {item.isTyping ? (
                <View style={styles.typingContainer}>
                  <Text style={styles.typingText}>sedang mengetik...</Text>
                </View>
              ) : (
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
              )}
            </View>
            
            {item.unreadCount > 0 && (
              <LinearGradient
                colors={['#FF6B6B', '#FF8E53']}
                style={styles.unreadBadge}
              >
                <Text style={styles.unreadCount}>
                  {item.unreadCount > 99 ? '99+' : item.unreadCount}
                </Text>
              </LinearGradient>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>
      </BlurView>
    </View>
  );

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>Percakapan</Text>
              <Text style={styles.subtitle}>
                {filteredChats.length} obrolan aktif
              </Text>
            </View>
            
            <TouchableOpacity style={styles.headerButton}>
              <LinearGradient
                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                style={styles.headerButtonGradient}
              >
                <Ionicons name="add" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <BlurView intensity={30} style={styles.searchBlur}>
            <Ionicons name="search" size={20} color="rgba(255,255,255,0.7)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari percakapan..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="rgba(255,255,255,0.7)" />
              </TouchableOpacity>
            )}
          </BlurView>
        </View>

        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          style={styles.chatsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatsListContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="chatbubbles-outline" size={64} color="rgba(255,255,255,0.5)" />
              <Text style={styles.emptyText}>Belum ada percakapan</Text>
              <Text style={styles.emptySubtext}>
                Mulai percakapan baru dengan teman Anda
              </Text>
            </View>
          }
        />

        <View style={styles.floatingButton}>
          <TouchableOpacity style={styles.fab}>
            <LinearGradient
              colors={['#FF6B6B', '#FF8E53']}
              style={styles.fabGradient}
            >
              <Ionicons name="chatbubble" size={24} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <CopyrightFooter />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    fontWeight: '500',
  },
  headerButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  headerButtonGradient: {
    padding: theme.spacing.sm,
    borderRadius: 25,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  searchBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 25,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.sizes.md,
    color: '#fff',
    fontWeight: '500',
  },
  chatsList: {
    flex: 1,
  },
  chatsListContent: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  chatItemContainer: {
    marginBottom: theme.spacing.sm,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: theme.typography.sizes.lg,
    fontWeight: '700',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00E676',
    borderWidth: 3,
    borderColor: '#fff',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  chatName: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: '600',
    color: '#fff',
  },
  timestamp: {
    fontSize: theme.typography.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageContainer: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  lastMessage: {
    fontSize: theme.typography.sizes.md,
    color: 'rgba(255,255,255,0.8)',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    fontSize: theme.typography.sizes.sm,
    color: '#00E676',
    fontStyle: 'italic',
  },
  unreadBadge: {
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xs,
  },
  unreadCount: {
    color: '#fff',
    fontSize: theme.typography.sizes.xs,
    fontWeight: '700',
  },
  moreButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl * 2,
  },
  emptyText: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: theme.typography.sizes.md,
    color: 'rgba(255,255,255,0.6)',
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: theme.spacing.md,
  },
  fab: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    padding: theme.spacing.md,
    borderRadius: 30,
  },
});