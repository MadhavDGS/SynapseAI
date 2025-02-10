import { StyleSheet, TouchableOpacity, ScrollView, Image, Platform, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface College {
  id: string;
  name: string;
  code: string;
  logo?: any;
}

const COLLEGES: College[] = [
  {
    id: '1',
    name: 'JNTUH',
    code: 'jntuh',
    logo: require('@/assets/images/jntuhlogo.png'),
  },
  {
    id: '2',
    name: 'GURUNANAK INSTITUTIONS',
    code: 'gurunanak',
    logo: require('@/assets/images/gurunanaklogo.png'),
  },
  {
    id: '3',
    name: 'ANURAG UNIVERSITY',
    code: 'anurag',
    logo: require('@/assets/images/anuraglogo.png'),
  },
  {
    id: '4',
    name: 'CVR COLLEGE',
    code: 'cvr',
    logo: require('@/assets/images/cvrlogo.png'),
  },
];

export default function CollegeScreen() {
  const handleCollegePress = (college: College) => {
    router.push({
      pathname: '/departments',
      params: {
        collegeId: college.code,
        collegeName: college.name
      }
    });
  };

  const renderCollegeButton = (college: College) => (
    <TouchableOpacity 
      key={college.id} 
      style={styles.collegeButton}
      onPress={() => handleCollegePress(college)}
    >
      <ThemedView style={styles.collegeContent}>
        <ThemedView style={styles.collegeInfo}>
          {college.logo && (
            <Image 
              source={college.logo} 
              style={styles.collegeLogo}
              resizeMode="contain"
            />
          )}
          <ThemedText style={styles.collegeName}>{college.name}</ThemedText>
        </ThemedView>
        <Ionicons name="chevron-forward" size={24} color="#2B95DC" />
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.pageTitle}>College Space</ThemedText>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.collegeList}>
          {COLLEGES.map(renderCollegeButton)}
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
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 16,
    paddingTop: 24,
    marginTop: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  collegeList: {
    gap: 12,
    paddingBottom: 16,
  },
  collegeButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    overflow: 'hidden',
  },
  collegeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  collegeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  collegeLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  collegeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 