import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FocusStats {
  sessions: number;
  totalMinutes: number;
  streak: number;
}

export default function FocusScreen() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [stats, setStats] = useState<FocusStats>({
    sessions: 0,
    totalMinutes: 0,
    streak: 0,
  });

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      // Update stats when session completes
      setStats(prev => ({
        sessions: prev.sessions + 1,
        totalMinutes: prev.totalMinutes + 25,
        streak: prev.streak + 1,
      }));
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link href="/(tabs)/more" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.pageTitle}>Focus Mode</Text>
      </View>

      <View style={styles.focusCard}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(time)}</Text>
          <Text style={styles.sessionText}>Focus Session</Text>
        </View>
        <TouchableOpacity 
          style={[styles.startButton, isActive && styles.activeButton]} 
          onPress={toggleTimer}
        >
          <Text style={styles.startButtonText}>
            {isActive ? 'Pause Focus' : 'Start Focus'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.sessions}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.totalMinutes}m</Text>
          <Text style={styles.statLabel}>Total Focus</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.streak}</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
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
  },
  focusCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 40,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    fontSize: 72,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 2,
    fontVariant: ['tabular-nums'],
    marginBottom: 16,
  },
  sessionText: {
    fontSize: 20,
    color: '#666666',
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#2B95DC',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 100,
    minWidth: 200,
  },
  activeButton: {
    backgroundColor: '#DC2B2B',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2B95DC',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
}); 