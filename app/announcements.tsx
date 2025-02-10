import { StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import WebView from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Map college codes to their announcement URLs
const COLLEGE_URLS = {
  'jntuh': 'https://jntuh.ac.in/notifications',
  'anurag': 'https://anurag.edu.in/notifications/',
  'cvr': 'https://cvr.ac.in/home4/index.php/5-news-sp-452/news',
  'gurunanak': 'https://gnithyd.ac.in/notifications.php'
};

export default function AnnouncementsScreen() {
  const { collegeId, collegeName } = useLocalSearchParams();
  const announcementUrl = COLLEGE_URLS[collegeId as keyof typeof COLLEGE_URLS];

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#2B95DC" />
        </TouchableOpacity>
        <ThemedText style={styles.pageTitle}>{collegeName} Announcements</ThemedText>
      </ThemedView>

      <WebView
        source={{ uri: announcementUrl }}
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn(
            'WebView received error status code: ',
            nativeEvent.statusCode
          );
        }}
      />
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
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}); 