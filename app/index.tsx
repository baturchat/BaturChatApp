import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import LottieView from 'lottie-react-native';
import CopyrightFooter from '../components/CopyrightFooter';
import { theme } from '../constants/theme';

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Auto-hide splash after animations
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (!loading && !showSplash) {
      // Add small delay to ensure smooth transition
      const navigationTimer = setTimeout(() => {
        if (user) {
          console.log('User authenticated, navigating to tabs:', user.uid);
          router.replace('/(tabs)');
        } else {
          console.log('No user, navigating to auth');
          router.replace('/auth');
        }
      }, 100);

      return () => clearTimeout(navigationTimer);
    }
  }, [user, loading, showSplash, router]);

  if (showSplash || loading) {
    return (
      <LinearGradient
        colors={['#1E88E5', '#42A5F5', '#90CAF9']}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <LottieView
              source={require('../assets/animations/login.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>BaturChat</Text>
            <Text style={styles.subtitle}>Connecting Friends Everywhere</Text>
            
            <View style={styles.loadingContainer}>
              <LoadingSpinner color="#fff" />
              <Text style={styles.loadingText}>
                {loading ? 'Loading your conversations...' : 'Preparing BaturChat...'}
              </Text>
            </View>
          </View>
        </View>
        
        <CopyrightFooter />
      </LinearGradient>
    );
  }

  // This should never be reached due to the useEffect redirects
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  lottie: {
    width: 250,
    height: 250,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: theme.spacing.sm,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: theme.typography.sizes.lg,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: theme.typography.sizes.md,
    marginTop: theme.spacing.md,
    textAlign: 'center',
    fontWeight: '500',
  },
});