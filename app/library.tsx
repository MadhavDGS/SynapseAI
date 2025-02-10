import { StyleSheet, TouchableOpacity, ScrollView, View, Platform, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Book {
  id: string;
  title: string;
  author: string;
  available: boolean;
  category: string;
}

const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Data Structures and Algorithms',
    author: 'Thomas H. Cormen',
    available: true,
    category: 'Computer Science',
  },
  {
    id: '2',
    title: 'Digital Electronics',
    author: 'Morris Mano',
    available: false,
    category: 'Electronics',
  },
  {
    id: '3',
    title: 'Engineering Mathematics',
    author: 'B.S. Grewal',
    available: true,
    category: 'Mathematics',
  },
  {
    id: '4',
    title: 'Theory of Machines',
    author: 'R.S. Khurmi',
    available: true,
    category: 'Mechanical',
  },
];

export default function LibraryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#2B95DC" />
        </TouchableOpacity>
        <ThemedText style={styles.pageTitle}>Library</ThemedText>
      </ThemedView>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666666" />
          <ThemedText style={styles.searchPlaceholder}>Search books...</ThemedText>
        </ThemedView>

        {BOOKS.map((book) => (
          <ThemedView key={book.id} style={styles.bookCard}>
            <View style={styles.bookInfo}>
              <ThemedText style={styles.bookTitle}>{book.title}</ThemedText>
              <ThemedText style={styles.bookAuthor}>by {book.author}</ThemedText>
              <ThemedText style={styles.bookCategory}>{book.category}</ThemedText>
            </View>
            <ThemedView 
              style={[
                styles.availabilityBadge,
                !book.available && styles.unavailableBadge
              ]}
            >
              <ThemedText style={styles.availabilityText}>
                {book.available ? 'Available' : 'Borrowed'}
              </ThemedText>
            </ThemedView>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  searchPlaceholder: {
    color: '#666666',
    fontSize: 16,
  },
  bookCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  bookInfo: {
    marginBottom: 12,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  bookCategory: {
    fontSize: 14,
    color: '#2B95DC',
  },
  availabilityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2B95DC33',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  unavailableBadge: {
    backgroundColor: '#FF3B3033',
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2B95DC',
  },
}); 