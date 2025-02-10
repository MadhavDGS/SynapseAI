import { StyleSheet, TouchableOpacity, ScrollView, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
}

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const addNote = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        title: newTitle,
        content: newContent,
        timestamp: new Date(),
      };
      setNotes([newNote, ...notes]);
      setNewTitle('');
      setNewContent('');
      setIsAdding(false);
    }
  };

  const renderNote = (note: Note) => (
    <TouchableOpacity 
      key={note.id}
      style={styles.noteCard}
      onPress={() => {/* Open note for editing */}}
    >
      <ThemedText style={styles.noteTitle}>{note.title}</ThemedText>
      <ThemedText style={styles.notePreview} numberOfLines={2}>
        {note.content}
      </ThemedText>
      <ThemedText style={styles.noteTime}>
        {note.timestamp.toLocaleDateString()}
      </ThemedText>
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
        <ThemedText style={styles.pageTitle}>Notes</ThemedText>
      </ThemedView>

      {isAdding ? (
        <ThemedView style={styles.addNoteContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Note Title"
            placeholderTextColor="#666666"
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
            style={styles.contentInput}
            placeholder="Write your note..."
            placeholderTextColor="#666666"
            value={newContent}
            onChangeText={setNewContent}
            multiline
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={() => setIsAdding(false)}
            >
              <ThemedText style={styles.buttonText}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]}
              onPress={addNote}
            >
              <ThemedText style={styles.buttonText}>Save</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      ) : (
        <>
          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {notes.length > 0 ? (
              notes.map(renderNote)
            ) : (
              <ThemedView style={styles.emptyState}>
                <Ionicons name="create-outline" size={64} color="#666666" />
                <ThemedText style={styles.emptyTitle}>No Notes Yet</ThemedText>
                <ThemedText style={styles.emptyText}>Create your first note</ThemedText>
              </ThemedView>
            )}
          </ScrollView>

          <TouchableOpacity 
            style={styles.fab}
            onPress={() => setIsAdding(true)}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </>
      )}
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
  content: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
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
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2B95DC',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addNoteContainer: {
    padding: 16,
  },
  titleInput: {
    height: 40,
    borderColor: '#666666',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    color: '#FFFFFF',
  },
  contentInput: {
    height: 100,
    borderColor: '#666666',
    borderWidth: 1,
    padding: 8,
    color: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: '#666666',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  saveButton: {
    backgroundColor: '#2B95DC',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  noteCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 8,
    marginBottom: 12,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  notePreview: {
    color: '#666666',
  },
  noteTime: {
    color: '#666666',
    marginTop: 8,
  },
}); 