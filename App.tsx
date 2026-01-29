import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation';
import { NotificationsProvider } from './src/context/NotificationsContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <NotificationsProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </NotificationsProvider>
    </SafeAreaProvider>
  );
}
