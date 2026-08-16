// import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useColorScheme } from 'react-native';
//
// import { AnimatedSplashOverlay } from '@/components/animated-icon';
// import AppTabs from '@/components/app-tabs';
//
// SplashScreen.preventAutoHideAsync();
//
// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <AnimatedSplashOverlay />
//       <AppTabs />
//     </ThemeProvider>
//   );
// }
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Built-in Expo icons

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#3B82F6', // Blue color for active tab
      headerShown: true
    }}>
      {/* Tab 1: Weather Search (Points to index.tsx) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Weather',
          tabBarIcon: ({ color }) => <Ionicons name="partly-sunny" size={24} color={color} />,
          headerShown: false, // Hiding this because we built a custom header in index.tsx
        }}
      />

      {/* Tab 2: About Screen (Points to explore.tsx) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <Ionicons name="information-circle" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}