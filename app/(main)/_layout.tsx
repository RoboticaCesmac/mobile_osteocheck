import { Tabs } from "expo-router";

export default function MainLayout() {
  return(
    <Tabs screenOptions={ { headerShown: false, animation: 'none' }}>
      <Tabs.Screen name="home"/>
    </Tabs>
  )
}