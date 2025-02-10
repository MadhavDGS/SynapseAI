import { createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      // Dummy authentication
      const dummyToken = 'dummy-auth-token';
      await SecureStore.setItemAsync('auth-token', dummyToken);
      setIsAuthenticated(true);
      // Only navigate to home after successful auth
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Dummy sign-up
      const dummyToken = 'dummy-auth-token';
      await SecureStore.setItemAsync('auth-token', dummyToken);
      setIsAuthenticated(true);
      // Only navigate to home after successful auth
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('auth-token');
      setIsAuthenticated(false);
      // Return to sign-up on sign out
      router.replace('/(auth)/sign-up');
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 