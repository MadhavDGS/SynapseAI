import { StyleSheet, TouchableOpacity, View, Platform, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function FocusScreen() {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalFocus, setTotalFocus] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      setSessions(prev => prev + 1);
      setTotalFocus(prev => prev + 25);
      setStreak(prev => prev + 1);
      setTime(25 * 60);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartFocus = () => {
    setIsActive(!isActive);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#2B95DC" />
        </TouchableOpacity>
        <ThemedText style={styles.pageTitle}>Focus Mode</ThemedText>
      </ThemedView>

      <ThemedView style={styles.focusCard}>
        <ThemedText style={styles.timerText}>{formatTime(time)}</ThemedText>
        <ThemedText style={styles.sessionText}>Focus Session</ThemedText>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={handleStartFocus}
        >
          <ThemedText style={styles.startButtonText}>
            {isActive ? 'Pause Focus' : 'Start Focus'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.statsCard}>
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>{sessions}</ThemedText>
          <ThemedText style={styles.statLabel}>Sessions</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>{totalFocus}m</ThemedText>
          <ThemedText style={styles.statLabel}>Total Focus</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>{streak}</ThemedText>
          <ThemedText style={styles.statLabel}>Streak</ThemedText>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  focusCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sessionText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#2B95DC',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B95DC',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 16,
    color: '#666666',
  },
}); 