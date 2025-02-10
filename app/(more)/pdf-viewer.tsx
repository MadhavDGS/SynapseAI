import { StyleSheet, TouchableOpacity, View, Linking } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

function PDFViewerScreen() {
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setPdfUri(result.uri);
        // Open PDF in system viewer or browser
        await WebBrowser.openBrowserAsync(result.uri);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
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
        <ThemedText style={styles.pageTitle}>PDF Viewer</ThemedText>
      </ThemedView>

      <ThemedView style={styles.emptyState}>
        <Ionicons name="document-outline" size={64} color="#666666" />
        <ThemedText style={styles.emptyTitle}>
          {pdfUri ? 'PDF opened in external viewer' : 'No PDF Selected'}
        </ThemedText>
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={pickDocument}
        >
          <ThemedText style={styles.uploadText}>
            {pdfUri ? 'Choose Another PDF' : 'Upload PDF'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
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
    padding: 16,
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
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: '#2B95DC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
  },
  uploadText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PDFViewerScreen; 