import { StyleSheet, TouchableOpacity } from 'react-native';
import { Link, router, Href } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ColorSchemeName } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ColorScheme = 'light' | 'dark' | null;

interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: Href<string>;
}

interface StudyToolItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: Href<string>;
}

const QUICK_ACCESS: QuickAccessItem[] = [
  {
    id: '1',
    title: 'College Space',
    description: 'Access department and semester materials',
    icon: 'school-outline',
    href: '/college',
  },
  {
    id: '2',
    title: 'Personal Space',
    description: 'Access your private study materials',
    icon: 'person-outline',
    href: '/(more)/personal',
  },
  {
    id: '3',
    title: 'Student Groups',
    description: 'Collaborate with your study groups',
    icon: 'people-outline',
    href: '/groups',
  },
  {
    id: '4',
    title: 'AI Assistant',
    description: 'Get help with your studies',
    icon: 'sparkles-outline',
    href: '/ai-chat',
  },
];

const STUDY_TOOLS: StudyToolItem[] = [
  {
    id: '1',
    title: 'Upload PDF',
    description: 'Add new documents to your library',
    icon: 'document-outline',
    href: '/(more)/pdf-viewer',
  },
  {
    id: '2',
    title: 'Focus Mode',
    description: 'Start a distraction-free study session',
    icon: 'timer-outline',
    href: '/focus',
  },
  {
    id: '3',
    title: 'Study Schedule',
    description: 'Plan and manage your study time',
    icon: 'calendar-outline',
    href: '/(more)/schedule',
  },
  {
    id: '4',
    title: 'Note Taker',
    description: 'Create and organize your notes',
    icon: 'create-outline',
    href: '/(more)/notes',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const iconColor = theme === 'dark' ? '#fff' : '#000';

  const renderCard = (item: QuickAccessItem | StudyToolItem) => (
    <Link href={item.href} key={item.id} asChild>
      <TouchableOpacity style={styles.card}>
        <Ionicons name={item.icon as any} size={24} color="#2B95DC" />
        <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.cardDescription}>{item.description}</ThemedText>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <Ionicons name="logo-electron" size={32} color="#2B95DC" />
        <ThemedText style={styles.appName}>SynapseAI</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Quick Access</ThemedText>
        <ThemedView style={styles.grid}>
          {QUICK_ACCESS.map(renderCard)}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Study Tools</ThemedText>
        <ThemedView style={styles.grid}>
          {STUDY_TOOLS.map(renderCard)}
        </ThemedView>
      </ThemedView>

      <TouchableOpacity 
        style={styles.focusButton}
        onPress={() => {
          router.push('/(more)/focus');
        }}
      >
        
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  focusButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  focusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  focusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 