import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SemesterScreen() {
  const { id, deptId, semId, collegeName, departmentName, semesterName } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#2B95DC" />
        </TouchableOpacity>
        <ThemedView>
          <ThemedText style={styles.breadcrumb}>
            {collegeName} / {departmentName}
          </ThemedText>
          <ThemedText style={styles.pageTitle}>{semesterName}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ThemedText style={styles.text}>Semester content will go here</ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... styles remain the same
}); 