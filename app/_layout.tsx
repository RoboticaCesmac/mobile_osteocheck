import { Stack } from "expo-router";
import "react-native-reanimated";
import AppContextProvider from "@/context/appContext";

export default function RootLayout() {
  return (
    <AppContextProvider>
      <Stack initialRouteName="(auth)">
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </AppContextProvider>
  );
}
