import { Stack } from 'expo-router';

export default function DepartmentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[dept]/[sem]" />
    </Stack>
  );
} 