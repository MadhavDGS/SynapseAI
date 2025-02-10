import { StyleSheet, TouchableOpacity, ScrollView, View, Platform, StatusBar } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Department {
  id: string;
  name: string;
  icon: string;
  semesters: number;
}

const DEPARTMENTS: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    icon: 'laptop-outline',
    semesters: 8,
  },
  {
    id: '2',
    name: 'Electronics',
    icon: 'hardware-chip-outline',
    semesters: 8,
  },
  {
    id: '3',
    name: 'Mechanical',
    icon: 'cog-outline',
    semesters: 8,
  },
  {
    id: '4',
    name: 'Civil',
    icon: 'business-outline',
    semesters: 8,
  },
];

export default function DepartmentsScreen() {
  const { collegeName, collegeId } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#2B95DC" />
        </TouchableOpacity>
        <ThemedText style={styles.pageTitle}>{collegeName}</ThemedText>
      </ThemedView>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Departments</ThemedText>
          <ThemedView style={styles.grid}>
            {DEPARTMENTS.map((dept) => (
              <TouchableOpacity 
                key={dept.id}
                style={styles.card}
                onPress={() => {
                  router.push({
                    pathname: '/semesters',
                    params: {
                      departmentId: dept.id,
                      departmentName: dept.name,
                      semesters: dept.semesters
                    }
                  });
                }}
              >
                <Ionicons name={dept.icon as any} size={32} color="#2B95DC" />
                <ThemedText style={styles.cardTitle}>{dept.name}</ThemedText>
                <ThemedText style={styles.cardDescription}>
                  {dept.semesters} semesters
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Access</ThemedText>
          <ThemedView style={styles.quickAccessContainer}>
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => router.push('/academic-calendar')}
            >
              <Ionicons name="calendar-outline" size={24} color="#2B95DC" />
              <ThemedText style={styles.quickAccessText}>Academic Calendar</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => {
                router.push({
                  pathname: '/announcements',
                  params: {
                    collegeId,
                    collegeName
                  }
                });
              }}
            >
              <Ionicons name="newspaper-outline" size={24} color="#2B95DC" />
              <ThemedText style={styles.quickAccessText}>Announcements</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => router.push('/library')}
            >
              <Ionicons name="library-outline" size={24} color="#2B95DC" />
              <ThemedText style={styles.quickAccessText}>Library</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
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
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFFFF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: '47%',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
  },
  quickAccessContainer: {
    gap: 12,
  },
  quickAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  quickAccessText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
}); 