import { Stack } from 'expo-router';

export default function SemesterLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="[semId]" />
    </Stack>
  );
} 