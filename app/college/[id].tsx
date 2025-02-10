import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface SemesterButton {
  id: string;
  title: string;
}

interface Department {
  id: string;
  title: string;
  code: string;
  semesters: SemesterButton[];
}

// Create array of 8 semesters with exact button text
const SEMESTERS: SemesterButton[] = [
  { id: '1', title: 'Sem 1' },
  { id: '2', title: 'Sem 2' },
  { id: '3', title: 'Sem 3' },
  { id: '4', title: 'Sem 4' },
  { id: '5', title: 'Sem 5' },
  { id: '6', title: 'Sem 6' },
  { id: '7', title: 'Sem 7' },
  { id: '8', title: 'Sem 8' },
];

const DEPARTMENTS: { [key: string]: Department } = {
  'cse': {
    id: '1',
    title: 'Computer Science and Engineering',
    code: 'cse',
    semesters: SEMESTERS,
  },
  'cse-aiml': {
    id: '2',
    title: 'Computer Science and Engineering (AI & ML)',
    code: 'cse-aiml',
    semesters: SEMESTERS,
  },
  'mech': {
    id: '3',
    title: 'Mechanical Engineering',
    code: 'mech',
    semesters: SEMESTERS,
  },
  'civil': {
    id: '4',
    title: 'Civil Engineering',
    code: 'civil',
    semesters: SEMESTERS,
  },
};

export default function CollegeDepartmentsScreen() {
  const { id, name, departments } = useLocalSearchParams();
  const departmentList = (departments as string).split(',');
  
  const renderSemesterButton = (semester: SemesterButton, department: Department) => (
    <TouchableOpacity 
      style={styles.semesterButton} 
      key={semester.id}
      onPress={() => {
        router.push({
          pathname: `/college/${id}/${department.code}/${semester.id}`,
          params: {
            collegeName: name,
            departmentName: department.title,
            semesterName: semester.title
          }
        });
      }}
    >
      <ThemedText style={styles.semesterText}>{semester.title}</ThemedText>
    </TouchableOpacity>
  );

  const renderDepartment = (deptCode: string) => {
    const department = DEPARTMENTS[deptCode];
    return (
      <ThemedView key={department.id} style={styles.departmentContainer}>
        <ThemedText style={styles.departmentTitle}>{department.title}</ThemedText>
        <ThemedView style={styles.semesterGrid}>
          {department.semesters.map(semester => renderSemesterButton(semester, department))}
        </ThemedView>
      </ThemedView>
    );
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
        <ThemedText style={styles.pageTitle}>College Space</ThemedText>
      </ThemedView>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {departmentList.map(renderDepartment)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContent: {
    gap: 20,
  },
  departmentContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
  },
  departmentTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#2B95DC',
  },
  semesterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 16,
    columnGap: 12,
    justifyContent: 'space-between',
  },
  semesterButton: {
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '23%',
    aspectRatio: 1.6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  semesterText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
}); 