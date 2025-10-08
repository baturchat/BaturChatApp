import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../constants/theme';
import CopyrightFooter from '../../components/CopyrightFooter';

export default function Profile() {
  const { user, logout, updateUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [bio, setBio] = useState('Salam kenal! Saya pengguna BaturChat 👋');
  const [avatar, setAvatar] = useState(user?.photoURL || '');

  const handleLogout = () => {
    Alert.alert(
      'Keluar',
      'Yakin ingin keluar dari BaturChat?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Keluar', style: 'destructive', onPress: logout },
      ]
    );
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        displayName,
        photoURL: avatar,
      });
      setEditing(false);
      Alert.alert('Berhasil', 'Profil berhasil diperbarui!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setAvatar(base64Image);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Gagal memilih gambar');
    }
  };

  const handleEditPress = () => {
    if (editing) {
      handleSaveProfile();
    } else {
      setEditing(true);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return user?.email?.charAt(0).toUpperCase() || 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const ProfileCard = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true,
    color = '#fff'
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
    color?: string;
  }) => (
    <TouchableOpacity onPress={onPress} disabled={!onPress} style={styles.profileCardWrapper}>
      <BlurView intensity={20} style={styles.profileCard}>
        <View style={styles.profileCardContent}>
          <View style={[styles.profileCardIcon, { backgroundColor: `${color}20` }]}>
            <Ionicons name={icon as any} size={24} color={color} />
          </View>
          <View style={styles.profileCardText}>
            <Text style={styles.profileCardTitle}>{title}</Text>
            {subtitle && (
              <Text style={styles.profileCardSubtitle}>{subtitle}</Text>
            )}
          </View>
          {showArrow && (
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.6)" />
          )}
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Profil</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditPress}
            >
              <LinearGradient
                colors={editing ? ['#4CAF50', '#45A049'] : ['#FF6B6B', '#FF8E53']}
                style={styles.editButtonGradient}
              >
                <Ionicons 
                  name={editing ? 'checkmark' : 'pencil'} 
                  size={20} 
                  color="#fff" 
                />
                <Text style={styles.editButtonText}>
                  {editing ? 'Simpan' : 'Edit'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.profileSection}>
            <BlurView intensity={30} style={styles.profileMainCard}>
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={editing ? handlePickImage : undefined}
              >
                <LinearGradient
                  colors={['#FF6B6B', '#FF8E53']}
                  style={styles.avatar}
                >
                  <Text style={styles.avatarText}>
                    {getInitials(user?.displayName)}
                  </Text>
                </LinearGradient>
                {editing && (
                  <BlurView intensity={80} style={styles.cameraOverlay}>
                    <Ionicons name="camera" size={28} color="#fff" />
                  </BlurView>
                )}
              </TouchableOpacity>

              <View style={styles.profileInfo}>
                {editing ? (
                  <TextInput
                    style={styles.nameInput}
                    value={displayName}
                    onChangeText={setDisplayName}
                    placeholder="Nama lengkap"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                  />
                ) : (
                  <Text style={styles.userName}>{user?.displayName || 'Nama belum diset'}</Text>
                )}
                <Text style={styles.userEmail}>{user?.email}</Text>
                
                <View style={styles.statusContainer}>
                  <View style={styles.onlineIndicator} />
                  <Text style={styles.statusText}>Online</Text>
                </View>
              </View>
            </BlurView>
          </View>

          {editing ? (
            <View style={styles.bioSection}>
              <BlurView intensity={20} style={styles.bioCard}>
                <Text style={styles.bioLabel}>Bio</Text>
                <TextInput
                  style={styles.bioInput}
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Ceritakan tentang diri Anda..."
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  multiline
                  numberOfLines={3}
                />
              </BlurView>
            </View>
          ) : (
            <ProfileCard
              icon="person-outline"
              title="Bio"
              subtitle={bio}
              color="#4ECDC4"
            />
          )}

          <ProfileCard
            icon="mail-outline"
            title="Email"
            subtitle={user?.email}
            showArrow={false}
            color="#45B7D1"
          />

          <ProfileCard
            icon="time-outline"
            title="Bergabung sejak"
            subtitle={user?.metadata?.creationTime 
              ? new Date(user.metadata.creationTime).toLocaleDateString('id-ID')
              : 'Tidak diketahui'}
            showArrow={false}
            color="#96CEB4"
          />

          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Pengaturan</Text>
            
            <ProfileCard
              icon="notifications-outline"
              title="Notifikasi"
              subtitle="Kelola notifikasi aplikasi"
              onPress={() => Alert.alert('Segera Hadir', 'Fitur pengaturan notifikasi akan segera hadir!')}
              color="#FECA57"
            />

            <ProfileCard
              icon="shield-checkmark-outline"
              title="Privasi & Keamanan"
              subtitle="Enkripsi end-to-end aktif"
              onPress={() => Alert.alert('Segera Hadir', 'Pengaturan privasi akan segera hadir!')}
              color="#FF9FF3"
            />

            <ProfileCard
              icon="color-palette-outline"
              title="Tema"
              subtitle="Sesuaikan tampilan aplikasi"
              onPress={() => Alert.alert('Segera Hadir', 'Kustomisasi tema akan segera hadir!')}
              color="#54A0FF"
            />

            <ProfileCard
              icon="help-circle-outline"
              title="Bantuan & Dukungan"
              subtitle="Pusat bantuan BaturChat"
              onPress={() => Alert.alert('Bantuan', 'Hubungi tim support BaturChat di help@baturchat.com')}
              color="#26de81"
            />
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <BlurView intensity={20} style={styles.logoutBlur}>
              <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
              <Text style={styles.logoutText}>Keluar dari BaturChat</Text>
            </BlurView>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>

        <CopyrightFooter />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  editButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  editButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  editButtonText: {
    color: '#fff',
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
  },
  profileSection: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  profileMainCard: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: theme.spacing.lg,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: theme.spacing.xs,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: theme.typography.sizes.md,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: theme.spacing.md,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00E676',
  },
  statusText: {
    fontSize: theme.typography.sizes.sm,
    color: '#00E676',
    fontWeight: '600',
  },
  bioSection: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  bioCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  bioLabel: {
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
    color: '#fff',
    marginBottom: theme.spacing.sm,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.sizes.md,
    color: '#fff',
    textAlignVertical: 'top',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  profileCardWrapper: {
    marginBottom: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
  },
  profileCard: {
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  profileCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  profileCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  profileCardText: {
    flex: 1,
  },
  profileCardTitle: {
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
    color: '#fff',
  },
  profileCardSubtitle: {
    fontSize: theme.typography.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  settingsSection: {
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: '700',
    color: '#fff',
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.xs,
  },
  logoutButton: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  logoutBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    gap: theme.spacing.sm,
  },
  logoutText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
    color: '#FF6B6B',
  },
});