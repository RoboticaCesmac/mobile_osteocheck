import { Stack } from "expo-router";
import "react-native-reanimated";
import AppContextProvider from "@/context/appContext";
import { useEffect, useState } from "react";
import SplashLoading from "@/components/splashLoading.component";

export default function RootLayout() {
  const [isAppInitialLoading, setIsAppInitialLoading] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
      // Simulate checking auth, loading fonts, etc.
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsAppInitialLoading(false);
    };
    loadApp();
  }, []);

  return (
    <AppContextProvider>
      {isAppInitialLoading && <SplashLoading />}
      <Stack initialRouteName="(auth)" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="patient/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="questionnaire/[patientId]" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </AppContextProvider>
  );
}
