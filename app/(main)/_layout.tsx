import { Tabs } from "expo-router";
import { AntDesign, Feather } from '@expo/vector-icons';

export default function MainLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, animation: 'none' }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          tabBarLabel: 'Config.',
          tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}