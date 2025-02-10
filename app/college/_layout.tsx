import { Stack } from 'expo-router';

export default function CollegeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen 
        name="details" 
        options={{
          headerShown: false,
          presentation: 'modal'
        }}
      />
    </Stack>
  );
} 