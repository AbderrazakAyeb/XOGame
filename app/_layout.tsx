import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }} // Hides header for player name screen
      />
      <Stack.Screen
        name="game"
        options={{ headerShown: false }} // Hides header for game screen
      />
    </Stack>
  );
}
