import { StyleSheet, TouchableOpacity, ScrollView, View, Platform, StatusBar } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'holiday' | 'event';
}

const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Mid Semester Exams',
    date: 'March 15-25, 2024',
    type: 'exam',
  },
  {
    id: '2',
    title: 'Spring Break',
    date: 'March 27 - April 5, 2024',
    type: 'holiday',
  },
  {
    id: '3',
    title: 'Tech Fest 2024',
    date: 'April 10-12, 2024',
    type: 'event',
  },
  {
    id: '4',
    title: 'End Semester Exams',
    date: 'May 20-31, 2024',
    type: 'exam',
  },
];

export default function AcademicCalendarScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#2B95DC" />
        </TouchableOpacity>
        <ThemedText style={styles.pageTitle}>Academic Calendar</ThemedText>
      </ThemedView>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {CALENDAR_EVENTS.map((event) => (
          <ThemedView key={event.id} style={styles.eventCard}>
            <Ionicons 
              name={
                event.type === 'exam' ? 'document-text' : 
                event.type === 'holiday' ? 'calendar' : 'star'
              } 
              size={24} 
              color="#2B95DC" 
            />
            <View style={styles.eventInfo}>
              <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
              <ThemedText style={styles.eventDate}>{event.date}</ThemedText>
            </View>
          </ThemedView>
        ))}
      </ScrollView>
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
    paddingTop: Platform.OS === 'android' ? 40 : 24,
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
    flex: 1,
    paddingTop: 8,
    lineHeight: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 16,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#666666',
  },
}); 