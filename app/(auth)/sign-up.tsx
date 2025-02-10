import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/contexts/auth-context';

type ColorScheme = 'light' | 'dark' | null;

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpScreen() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const colorScheme: ColorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const tintColor = Colors[theme].tint;
  const { signUp } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await signUp(formData.email, formData.password);
    } catch (error) {
      console.error('Sign up failed:', error);
      setErrors({ email: 'Failed to create account' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (
    field: keyof FormData,
    placeholder: string,
    options: Object = {}
  ) => (
    <ThemedView>
      <TextInput
        style={[
          styles.input,
          errors[field] && styles.inputError,
          { 
            backgroundColor: theme === 'dark' ? '#333' : '#e1e1e1',
            color: Colors[theme].text 
          }
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors[theme].icon}
        value={formData[field]}
        onChangeText={(text) => {
          setFormData(prev => ({ ...prev, [field]: text }));
          if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
          }
        }}
        {...options}
      />
      {errors[field] && (
        <ThemedText style={styles.errorText}>{errors[field]}</ThemedText>
      )}
    </ThemedView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <Image 
            source={require('@/assets/images/logo.png')} 
            style={styles.logo}
          />
          <ThemedText type="title">SynapseAI</ThemedText>
          <ThemedText style={styles.subtitle}>
            Your AI-powered study assistant
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          {renderInput('email', 'Email address', {
            autoCapitalize: 'none',
            keyboardType: 'email-address',
            autoComplete: 'email'
          })}
          
          {renderInput('password', 'Password', {
            secureTextEntry: true,
            autoComplete: 'new-password'
          })}
          
          {renderInput('confirmPassword', 'Confirm Password', {
            secureTextEntry: true,
            autoComplete: 'new-password'
          })}

          <TouchableOpacity
            style={[
              styles.button,
              isLoading && styles.buttonDisabled
            ]}
            onPress={handleSignUp}
            disabled={isLoading}>
            <ThemedText style={styles.buttonText}>
              {isLoading ? 'Creating Account...' : 'Sign up with Email'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.footer}>
          <ThemedText>Already have an account? </ThemedText>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <ThemedText style={[styles.link, { color: tintColor }]}>
                Log in
              </ThemedText>
            </TouchableOpacity>
          </Link>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    opacity: 0.7,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: Colors.light.error,
    borderWidth: 1,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#2B95DC',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  link: {
    fontWeight: '600',
  },
}); 