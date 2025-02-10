import { StyleSheet, TouchableOpacity, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  subject: string;
  createdAt: Date;
}

export default function GroupsScreen() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newGroup, setNewGroup] = useState<Partial<Group>>({});

  const createGroup = () => {
    if (newGroup.name && newGroup.subject) {
      const group: Group = {
        id: Date.now().toString(),
        name: newGroup.name,
        description: newGroup.description || '',
        memberCount: 1,
        subject: newGroup.subject,
        createdAt: new Date(),
      };
      setGroups([...groups, group]);
      setNewGroup({});
      setIsCreating(false);
    }
  };

  const renderGroup = (group: Group) => (
    <TouchableOpacity 
      key={group.id}
      style={styles.groupCard}
      onPress={() => {/* Navigate to group details */}}
    >
      <View style={styles.groupHeader}>
        <ThemedText style={styles.groupName}>{group.name}</ThemedText>
        <ThemedView style={styles.memberCount}>
          <Ionicons name="people" size={16} color="#2B95DC" />
          <ThemedText style={styles.memberCountText}>{group.memberCount}</ThemedText>
        </ThemedView>
      </View>
      <ThemedText style={styles.groupSubject}>{group.subject}</ThemedText>
      {group.description && (
        <ThemedText style={styles.groupDescription}>{group.description}</ThemedText>
      )}
      <ThemedText style={styles.groupDate}>
        Created {group.createdAt.toLocaleDateString()}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.pageTitle}>Study Groups</ThemedText>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setIsCreating(true)}
        >
          <Ionicons name="add" size={24} color="#2B95DC" />
        </TouchableOpacity>
      </ThemedView>

      {isCreating ? (
        <ThemedView style={styles.createForm}>
          <TextInput
            style={styles.input}
            placeholder="Group Name"
            placeholderTextColor="#666666"
            value={newGroup.name}
            onChangeText={name => setNewGroup(prev => ({ ...prev, name }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Subject"
            placeholderTextColor="#666666"
            value={newGroup.subject}
            onChangeText={subject => setNewGroup(prev => ({ ...prev, subject }))}
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description (optional)"
            placeholderTextColor="#666666"
            value={newGroup.description}
            onChangeText={description => setNewGroup(prev => ({ ...prev, description }))}
            multiline
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={() => setIsCreating(false)}
            >
              <ThemedText style={styles.buttonText}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.createGroupButton]}
              onPress={createGroup}
            >
              <ThemedText style={styles.buttonText}>Create Group</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      ) : (
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {groups.length > 0 ? (
            groups.map(renderGroup)
          ) : (
            <ThemedView style={styles.emptyState}>
              <Ionicons name="people-outline" size={64} color="#666666" />
              <ThemedText style={styles.emptyTitle}>No Study Groups Yet</ThemedText>
              <ThemedText style={styles.emptyText}>Create or join a study group</ThemedText>
            </ThemedView>
          )}
        </ScrollView>
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
    justifyContent: 'space-between',
    padding: 16,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  createButton: {
    padding: 8,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  createForm: {
    padding: 16,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 0.48,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  createGroupButton: {
    backgroundColor: '#2B95DC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  groupCard: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  memberCountText: {
    color: '#2B95DC',
    fontSize: 14,
  },
  groupSubject: {
    color: '#2B95DC',
    fontSize: 16,
    marginBottom: 8,
  },
  groupDescription: {
    color: '#666666',
    marginBottom: 8,
  },
  groupDate: {
    color: '#666666',
    fontSize: 12,
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
}); 