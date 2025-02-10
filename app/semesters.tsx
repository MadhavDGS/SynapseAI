import { StyleSheet, TouchableOpacity, ScrollView, View, Platform, StatusBar } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface SemesterButton {
  id: number;
  name: string;
}

export default function SemestersScreen() {
  const { departmentName, semesters } = useLocalSearchParams();
  
  // Generate semester buttons based on the number of semesters
  const semesterButtons: SemesterButton[] = Array.from(
    { length: Number(semesters) },
    (_, i) => ({
      id: i + 1,
      name: `Semester ${i + 1}`,
    })
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#2B95DC" />
        </TouchableOpacity>
        <ThemedText style={styles.pageTitle}>{departmentName}</ThemedText>
      </ThemedView>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.semesterGrid}>
          {semesterButtons.map((semester) => (
            <TouchableOpacity 
              key={semester.id}
              style={styles.semesterButton}
              onPress={() => {
                router.push({
                  pathname: '/subjects',
                  params: {
                    semesterId: semester.id,
                    semesterName: semester.name,
                    departmentName
                  }
                });
              }}
            >
              <ThemedText style={styles.semesterNumber}>{semester.id}</ThemedText>
              <ThemedText style={styles.semesterText}>Semester</ThemedText>
            </TouchableOpacity>
          ))}
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
  semesterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 16,
  },
  semesterButton: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  semesterNumber: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2B95DC',
    marginBottom: 8,
    lineHeight: 50,
  },
  semesterText: {
    fontSize: 16,
    color: '#666666',
  },
}); 