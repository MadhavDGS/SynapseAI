import { StyleSheet, TouchableOpacity, ScrollView, TextInput, View, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Schedule {
  id: string;
  title: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  description: string;
}

export default function ScheduleScreen() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Partial<Schedule>>({
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setNewSchedule(prev => ({ ...prev, date }));
    }
  };

  const handleStartTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowStartTimePicker(false);
    if (date) {
      setNewSchedule(prev => ({ ...prev, startTime: date }));
    }
  };

  const handleEndTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowEndTimePicker(false);
    if (date) {
      setNewSchedule(prev => ({ ...prev, endTime: date }));
    }
  };

  const addSchedule = () => {
    if (newSchedule.title && newSchedule.date && newSchedule.startTime && newSchedule.endTime) {
      const schedule: Schedule = {
        id: Date.now().toString(),
        title: newSchedule.title!,
        date: newSchedule.date!,
        startTime: newSchedule.startTime!,
        endTime: newSchedule.endTime!,
        description: newSchedule.description || '',
      };
      setSchedules([...schedules, schedule]);
      setNewSchedule({
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
      });
      setIsAdding(false);
    }
  };

  const renderSchedule = (schedule: Schedule) => (
    <ThemedView key={schedule.id} style={styles.scheduleCard}>
      <ThemedText style={styles.scheduleTitle}>{schedule.title}</ThemedText>
      <ThemedText style={styles.scheduleDate}>
        {schedule.date.toLocaleDateString()}
      </ThemedText>
      <ThemedText style={styles.scheduleTime}>
        {schedule.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
        {schedule.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </ThemedText>
      {schedule.description && (
        <ThemedText style={styles.scheduleDescription}>{schedule.description}</ThemedText>
      )}
    </ThemedView>
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
        <ThemedText style={styles.pageTitle}>Study Schedule</ThemedText>
      </ThemedView>

      {isAdding ? (
        <ThemedView style={styles.addScheduleContainer}>
          <TextInput
            style={styles.input}
            placeholder="Schedule Title"
            placeholderTextColor="#666666"
            value={newSchedule.title}
            onChangeText={title => setNewSchedule(prev => ({ ...prev, title }))}
          />
          
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <ThemedText style={styles.dateButtonText}>
              Date: {newSchedule.date?.toLocaleDateString()}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowStartTimePicker(true)}
          >
            <ThemedText style={styles.dateButtonText}>
              Start Time: {newSchedule.startTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowEndTimePicker(true)}
          >
            <ThemedText style={styles.dateButtonText}>
              End Time: {newSchedule.endTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </ThemedText>
          </TouchableOpacity>

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description (optional)"
            placeholderTextColor="#666666"
            value={newSchedule.description}
            onChangeText={description => setNewSchedule(prev => ({ ...prev, description }))}
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
              onPress={addSchedule}
            >
              <ThemedText style={styles.buttonText}>Save</ThemedText>
            </TouchableOpacity>
          </View>

          {(showDatePicker || showStartTimePicker || showEndTimePicker) && (
            <DateTimePicker
              value={
                showDatePicker ? newSchedule.date! :
                showStartTimePicker ? newSchedule.startTime! :
                newSchedule.endTime!
              }
              mode={showDatePicker ? 'date' : 'time'}
              onChange={
                showDatePicker ? handleDateChange :
                showStartTimePicker ? handleStartTimeChange :
                handleEndTimeChange
              }
            />
          )}
        </ThemedView>
      ) : (
        <>
          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {schedules.length > 0 ? (
              schedules.map(renderSchedule)
            ) : (
              <ThemedView style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={64} color="#666666" />
                <ThemedText style={styles.emptyTitle}>No Schedules Yet</ThemedText>
                <ThemedText style={styles.emptyText}>Create your first study schedule</ThemedText>
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
  addScheduleContainer: {
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
  dateButton: {
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateButtonText: {
    color: '#FFFFFF',
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
  saveButton: {
    backgroundColor: '#2B95DC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scheduleCard: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  scheduleDate: {
    color: '#666666',
    marginBottom: 4,
  },
  scheduleTime: {
    color: '#2B95DC',
    marginBottom: 8,
  },
  scheduleDescription: {
    color: '#666666',
  },
}); 