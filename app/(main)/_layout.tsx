import { AntDesign, Feather } from '@expo/vector-icons';
import { Tabs } from "expo-router";

export default function MainLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, animation: 'none' }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="biblioteca"
        options={{
          tabBarLabel: 'Biblioteca',
          tabBarIcon: ({ color }) => <AntDesign name="book" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color }) => <AntDesign name="clock-circle" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="patients"
        options={{
          tabBarLabel: 'Pacientes',
          tabBarIcon: ({ color }) => <AntDesign name="team" size={24} color={color} />,
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