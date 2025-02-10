import { StyleSheet, TouchableOpacity, ScrollView, TextInput, View, Platform, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface StudyMaterial {
  id: string;
  title: string;
  type: 'note' | 'pdf' | 'link';
  description?: string;
  tags: string[];
  createdAt: Date;
  lastAccessed?: Date;
  isFavorite: boolean;
  uri?: string;
  fileSize?: number;
}

const STORAGE_KEY = 'study_materials';

export default function PersonalScreen() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [newMaterial, setNewMaterial] = useState<Partial<StudyMaterial>>({
    type: 'note',
    tags: [],
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Load saved materials on mount
  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      const savedMaterials = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedMaterials) {
        const parsed = JSON.parse(savedMaterials);
        // Convert string dates back to Date objects
        const materialsWithDates = parsed.map((material: any) => ({
          ...material,
          createdAt: new Date(material.createdAt),
          lastAccessed: material.lastAccessed ? new Date(material.lastAccessed) : undefined,
        }));
        setMaterials(materialsWithDates);
      }
    } catch (err) {
      console.error('Error loading materials:', err);
    }
  };

  const saveMaterials = async (newMaterials: StudyMaterial[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMaterials));
    } catch (err) {
      console.error('Error saving materials:', err);
    }
  };

  const pickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        const appDir = `${FileSystem.documentDirectory}pdfs/`;
        const dirInfo = await FileSystem.getInfoAsync(appDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(appDir, { intermediates: true });
        }

        const filename = `${Date.now()}-${result.name}`;
        const newUri = `${appDir}${filename}`;

        await FileSystem.copyAsync({
          from: result.uri,
          to: newUri,
        });

        const fileInfo = await FileSystem.getInfoAsync(newUri);

        const material: StudyMaterial = {
          id: Date.now().toString(),
          title: result.name,
          type: 'pdf',
          description: '',
          tags: [],
          createdAt: new Date(),
          isFavorite: false,
          uri: newUri,
          fileSize: fileInfo.size,
        };

        const updatedMaterials = [material, ...materials];
        setMaterials(updatedMaterials);
        saveMaterials(updatedMaterials);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const openPDF = async (uri: string, id: string) => {
    try {
      // Update last accessed time
      const updatedMaterials = materials.map(material => 
        material.id === id 
          ? { ...material, lastAccessed: new Date() }
          : material
      );
      setMaterials(updatedMaterials);
      saveMaterials(updatedMaterials);

      await WebBrowser.openBrowserAsync(uri);
    } catch (err) {
      console.error('Error opening PDF:', err);
    }
  };

  const toggleFavorite = (id: string) => {
    setMaterials(
      materials.map(material =>
        material.id === id
          ? { ...material, isFavorite: !material.isFavorite }
          : material
      )
    );
  };

  const renderMaterial = (material: StudyMaterial) => (
    <TouchableOpacity 
      key={material.id}
      style={styles.card}
      onPress={() => material.uri ? openPDF(material.uri, material.id) : null}
    >
      <View style={styles.cardContent}>
        <Ionicons 
          name={material.type === 'pdf' ? 'document-text' : 'create'}
          size={24} 
          color="#2B95DC" 
        />
        <View style={styles.cardInfo}>
          <ThemedText style={styles.cardTitle} numberOfLines={1}>
            {material.title}
          </ThemedText>
          <ThemedText style={styles.cardDescription} numberOfLines={2}>
            {material.lastAccessed 
              ? `Last opened ${material.lastAccessed.toLocaleDateString()}`
              : `Added ${material.createdAt.toLocaleDateString()}`
            }
          </ThemedText>
          {material.fileSize && (
            <ThemedText style={styles.fileSize}>
              {(material.fileSize / (1024 * 1024)).toFixed(1)} MB
            </ThemedText>
          )}
        </View>
      </View>
    </TouchableOpacity>
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
        <ThemedText style={styles.pageTitle}>Personal Space</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        <ThemedView style={styles.grid}>
          <TouchableOpacity style={styles.card} onPress={pickPDF}>
            <Ionicons name="document-attach" size={24} color="#2B95DC" />
            <ThemedText style={styles.cardTitle}>Upload PDF</ThemedText>
            <ThemedText style={styles.cardDescription}>Add new study materials</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => router.push('/(more)/notes')}>
            <Ionicons name="create" size={24} color="#2B95DC" />
            <ThemedText style={styles.cardTitle}>Take Notes</ThemedText>
            <ThemedText style={styles.cardDescription}>Create new study notes</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>My Materials</ThemedText>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ThemedView style={styles.grid}>
            {materials.length > 0 ? (
              materials.map(renderMaterial)
            ) : (
              <ThemedView style={styles.emptyState}>
                <Ionicons name="documents-outline" size={64} color="#666666" />
                <ThemedText style={styles.emptyTitle}>No Materials Yet</ThemedText>
                <ThemedText style={styles.emptyText}>
                  Add your study materials to get started
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </ScrollView>
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
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
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
    gap: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
  },
  fileSize: {
    fontSize: 12,
    color: '#2B95DC',
  },
  emptyState: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
}); 