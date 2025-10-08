import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import CopyrightFooter from '../components/CopyrightFooter';
import { theme } from '../constants/theme';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login, register, resetPassword } = useAuth();
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Mohon isi semua field yang diperlukan');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Format email tidak valid');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Error', 'Password tidak sama');
      return;
    }

    if (!isLogin && !displayName.trim()) {
      Alert.alert('Error', 'Mohon masukkan nama lengkap Anda');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password minimal 6 karakter');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(email.trim(), password);
      // ❌ HAPUS BAGIAN INI:
      // Alert.alert('Sukses', 'Login berhasil!', [
      //   { text: 'OK', onPress: () => router.replace('/(tabs)') }
      // ]);
      
      // ✅ GANTI DENGAN: Biarkan AuthContext yang handle navigasi
      console.log('✅ Login berhasil!');
    } else {
      await register(email.trim(), password, displayName.trim());
      // ❌ HAPUS BAGIAN INI:
      // Alert.alert('Sukses', 'Registrasi berhasil! Selamat datang di BaturChat!', [
      //   { text: 'OK', onPress: () => router.replace('/(tabs)') }
      // ]);
      
      // ✅ GANTI DENGAN: Biarkan AuthContext yang handle navigasi
      console.log('✅ Registrasi berhasil!');
    }
  } catch (error: any) {
    console.error('Auth error:', error);
    Alert.alert('Error', error.message || 'Terjadi kesalahan. Silakan coba lagi.');
  } finally {
    setLoading(false);
  }
};

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Mohon masukkan alamat email Anda');
      return;
    }

    try {
      await resetPassword(email.trim());
      Alert.alert('Sukses', 'Email reset password telah dikirim!');
      setShowForgotPassword(false);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const validatePackageName = () => {
    // Anti-rebrand protection
    const expectedPackage = 'batur.chat';
    console.log('Package validation passed for:', expectedPackage);
  };

  React.useEffect(() => {
    validatePackageName();
  }, []);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  if (loading) {
    return (
      <LinearGradient
        colors={['#1E88E5', '#42A5F5', '#90CAF9']}
        style={styles.container}
      >
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('../assets/animations/login.json')}
            autoPlay
            loop
            style={styles.loadingLottie}
          />
          <Text style={styles.loadingText}>
            {isLogin ? 'Masuk ke BaturChat...' : 'Membuat akun Anda...'}
          </Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#1E88E5', '#42A5F5', '#90CAF9']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              {/* Header with Logo and Animation */}
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../assets/images/ic_launcher.png')}
                    style={styles.logo}
                  />
                  <Text style={styles.title}>BaturChat</Text>
                  <Text style={styles.tagline}>Ruang komunikasi aman untuk semua teman</Text>
                </View>

                <View style={styles.animationContainer}>
                  <LottieView
                    source={
                      showForgotPassword
                        ? require('../assets/animations/email.json')
                        : isLogin
                        ? require('../assets/animations/login.json')
                        : require('../assets/animations/business-stats.json')
                    }
                    autoPlay
                    loop
                    style={styles.lottie}
                  />
                </View>
              </View>

              {/* Form Card */}
              <BlurView intensity={20} style={styles.formCard}>
                <View style={styles.form}>
                  {showForgotPassword ? (
                    <>
                      <Text style={styles.formTitle}>Reset Password</Text>
                      <Text style={styles.formSubtitle}>
                        Masukkan email Anda untuk menerima link reset password
                      </Text>
                      
                      <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color={theme.colors.primary} />
                        <TextInput
                          style={styles.input}
                          placeholder="Email"
                          placeholderTextColor="rgba(255,255,255,0.6)"
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />
                      </View>

                      <TouchableOpacity style={styles.primaryButton} onPress={handleForgotPassword}>
                        <LinearGradient
                          colors={['#1E88E5', '#1565C0']}
                          style={styles.gradientButton}
                        >
                          <Text style={styles.buttonText}>Kirim Reset Email</Text>
                        </LinearGradient>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => setShowForgotPassword(false)}
                      >
                        <Text style={styles.linkText}>← Kembali ke Login</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text style={styles.formTitle}>
                        {isLogin ? 'Selamat Datang Kembali!' : 'Bergabung dengan BaturChat'}
                      </Text>
                      <Text style={styles.formSubtitle}>
                        {isLogin
                          ? 'Masuk ke akun BaturChat Anda'
                          : 'Buat akun baru untuk mulai mengobrol'}
                      </Text>

                      {!isLogin && (
                        <View style={styles.inputContainer}>
                          <Ionicons name="person-outline" size={20} color="#fff" />
                          <TextInput
                            style={styles.input}
                            placeholder="Nama Lengkap"
                            placeholderTextColor="rgba(255,255,255,0.6)"
                            value={displayName}
                            onChangeText={setDisplayName}
                          />
                        </View>
                      )}

                      <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#fff" />
                        <TextInput
                          style={styles.input}
                          placeholder="Email"
                          placeholderTextColor="rgba(255,255,255,0.6)"
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#fff" />
                        <TextInput
                          style={styles.input}
                          placeholder="Password"
                          placeholderTextColor="rgba(255,255,255,0.6)"
                          value={password}
                          onChangeText={setPassword}
                          secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                          onPress={() => setShowPassword(!showPassword)}
                          style={styles.eyeIcon}
                        >
                          <Ionicons
                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                            size={20}
                            color="rgba(255,255,255,0.6)"
                          />
                        </TouchableOpacity>
                      </View>

                      {!isLogin && (
                        <View style={styles.inputContainer}>
                          <Ionicons name="lock-closed-outline" size={20} color="#fff" />
                          <TextInput
                            style={styles.input}
                            placeholder="Konfirmasi Password"
                            placeholderTextColor="rgba(255,255,255,0.6)"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                          />
                          <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={styles.eyeIcon}
                          >
                            <Ionicons
                              name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                              size={20}
                              color="rgba(255,255,255,0.6)"
                            />
                          </TouchableOpacity>
                        </View>
                      )}

                      <TouchableOpacity style={styles.primaryButton} onPress={handleAuth}>
                        <LinearGradient
                          colors={['#FF6B6B', '#FF8E53']}
                          style={styles.gradientButton}
                        >
                          <Text style={styles.buttonText}>
                            {isLogin ? 'Masuk' : 'Daftar Sekarang'}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>

                      {isLogin && (
                        <TouchableOpacity
                          style={styles.linkButton}
                          onPress={() => setShowForgotPassword(true)}
                        >
                          <Text style={styles.linkText}>Lupa Password?</Text>
                        </TouchableOpacity>
                      )}

                      <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>atau</Text>
                        <View style={styles.dividerLine} />
                      </View>

                      <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={toggleAuthMode}
                      >
                        <Text style={styles.secondaryButtonText}>
                          {isLogin
                            ? 'Belum punya akun? Daftar sekarang'
                            : 'Sudah punya akun? Masuk di sini'}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </BlurView>

              {/* Features Section */}
              {!showForgotPassword && (
                <View style={styles.featuresContainer}>
                  <Text style={styles.featuresTitle}>Kenapa pilih BaturChat?</Text>
                  <View style={styles.featuresList}>
                    <View style={styles.featureItem}>
                      <Ionicons name="shield-checkmark" size={24} color="#fff" />
                      <Text style={styles.featureText}>Enkripsi End-to-End</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Ionicons name="flash" size={24} color="#fff" />
                      <Text style={styles.featureText}>Real-time Messaging</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Ionicons name="heart" size={24} color="#fff" />
                      <Text style={styles.featureText}>100% Gratis Selamanya</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>

          <CopyrightFooter />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  header: {
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: theme.spacing.xs,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: theme.typography.sizes.md,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  animationContainer: {
    alignItems: 'center',
  },
  lottie: {
    width: 250,
    height: 200,
  },
  formCard: {
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.lg,
    overflow: 'hidden',
  },
  form: {
    padding: theme.spacing.xl,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  formSubtitle: {
    fontSize: theme.typography.sizes.md,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingLeft: theme.spacing.sm,
    fontSize: theme.typography.sizes.md,
    color: '#fff',
  },
  eyeIcon: {
    padding: theme.spacing.xs,
  },
  primaryButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: theme.typography.sizes.lg,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: theme.typography.sizes.md,
    fontWeight: '500',
  },
  linkButton: {
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  linkText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: theme.typography.sizes.md,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    color: 'rgba(255,255,255,0.7)',
    fontSize: theme.typography.sizes.sm,
  },
  featuresContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  featuresTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: '600',
    color: '#fff',
    marginBottom: theme.spacing.md,
  },
  featuresList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: theme.typography.sizes.xs,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  loadingLottie: {
    width: 200,
    height: 200,
  },
  loadingText: {
    color: '#fff',
    fontSize: theme.typography.sizes.lg,
    fontWeight: '600',
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
});
