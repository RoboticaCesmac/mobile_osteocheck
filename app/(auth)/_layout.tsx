import { Stack } from "expo-router";

export default function AuthLayout() {
  return(
    <Stack initialRouteName="home" screenOptions={ { headerShown: false, animation: 'none' } }>
      <Stack.Screen name="home" options={{ gestureEnabled: true }} />
      <Stack.Screen name="login" options={{ gestureEnabled: true }} />
      <Stack.Screen name="register" options={{ gestureEnabled: true }} />
      <Stack.Screen name="registerConfirmationCode" options={{ gestureEnabled: true }} />
    </Stack>
  )
}