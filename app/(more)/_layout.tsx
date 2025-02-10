import { Stack } from 'expo-router';

export default function MoreLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="focus" />
      <Stack.Screen name="schedule" />
      <Stack.Screen name="notes" />
      <Stack.Screen name="pdf-viewer" />
      <Stack.Screen name="personal" />
    </Stack>
  );
} 