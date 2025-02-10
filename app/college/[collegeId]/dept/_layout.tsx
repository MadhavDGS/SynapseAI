import { Stack } from 'expo-router';

export default function DepartmentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="[deptId]" />
    </Stack>
  );
} 