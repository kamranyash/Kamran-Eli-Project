import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { ConsumerHomeScreen } from '../screens/ConsumerHomeScreen';
import { ConsumerJobsScreen } from '../screens/ConsumerJobsScreen';
import { ConsumerNewJobScreen } from '../screens/ConsumerNewJobScreen';
import { ConsumerJobDetailScreen } from '../screens/ConsumerJobDetailScreen';
import { ConsumerProvidersScreen } from '../screens/ConsumerProvidersScreen';
import { ConsumerProviderProfileScreen } from '../screens/ConsumerProviderProfileScreen';
import { ConsumerRequestAppointmentScreen } from '../screens/ConsumerRequestAppointmentScreen';
import { ConsumerMessagesScreen } from '../screens/ConsumerMessagesScreen';
import { ConsumerChatThreadScreen } from '../screens/ConsumerChatThreadScreen';
import { ConsumerAppointmentsScreen } from '../screens/ConsumerAppointmentsScreen';

export type ConsumerHomeStackParamList = {
  ConsumerHome: undefined;
  ConsumerJobDetail: { jobId: string };
};

export type ConsumerJobsStackParamList = {
  ConsumerJobs: undefined;
  ConsumerNewJob: undefined;
  ConsumerJobDetail: { jobId: string };
};

export type ConsumerProvidersStackParamList = {
  ConsumerProviders: undefined;
  ConsumerProviderProfile: { providerId: string };
  ConsumerRequestAppointment: { providerId: string };
};

export type ConsumerMessagesStackParamList = {
  ConsumerMessages: undefined;
  ConsumerChatThread: { threadId: string; username: string };
};

export type ConsumerAppointmentsStackParamList = {
  ConsumerAppointments: undefined;
};

const ConsumerHomeStack = createNativeStackNavigator<ConsumerHomeStackParamList>();
const ConsumerJobsStack = createNativeStackNavigator<ConsumerJobsStackParamList>();
const ConsumerProvidersStack = createNativeStackNavigator<ConsumerProvidersStackParamList>();
const ConsumerMessagesStack = createNativeStackNavigator<ConsumerMessagesStackParamList>();
const ConsumerAppointmentsStack = createNativeStackNavigator<ConsumerAppointmentsStackParamList>();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.text,
  headerTitleStyle: typography.h3,
  contentStyle: { backgroundColor: colors.background },
};

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <View style={styles.tabIcon}>
      <Text style={[styles.tabIconText, focused && styles.tabIconFocused]}>{label}</Text>
    </View>
  );
}

function ConsumerHomeStackScreen() {
  return (
    <ConsumerHomeStack.Navigator screenOptions={screenOptions}>
      <ConsumerHomeStack.Screen
        name="ConsumerHome"
        component={ConsumerHomeScreen}
        options={{ headerShown: false }}
      />
      <ConsumerHomeStack.Screen
        name="ConsumerJobDetail"
        component={ConsumerJobDetailScreen}
        options={{ title: 'Job details', headerBackTitle: 'Back' }}
      />
    </ConsumerHomeStack.Navigator>
  );
}

function ConsumerJobsTabStackScreen() {
  return (
    <ConsumerJobsStack.Navigator screenOptions={screenOptions}>
      <ConsumerJobsStack.Screen
        name="ConsumerJobs"
        component={ConsumerJobsScreen}
        options={{ headerShown: false }}
      />
      <ConsumerJobsStack.Screen
        name="ConsumerNewJob"
        component={ConsumerNewJobScreen}
        options={{ title: 'Post a job', headerBackTitle: 'Back' }}
      />
      <ConsumerJobsStack.Screen
        name="ConsumerJobDetail"
        component={ConsumerJobDetailScreen}
        options={{ title: 'Job details', headerBackTitle: 'Back' }}
      />
    </ConsumerJobsStack.Navigator>
  );
}

function ConsumerProvidersTabStackScreen() {
  return (
    <ConsumerProvidersStack.Navigator screenOptions={screenOptions}>
      <ConsumerProvidersStack.Screen
        name="ConsumerProviders"
        component={ConsumerProvidersScreen}
        options={{ headerShown: false }}
      />
      <ConsumerProvidersStack.Screen
        name="ConsumerProviderProfile"
        component={ConsumerProviderProfileScreen}
        options={{ title: 'Provider', headerBackTitle: 'Back' }}
      />
      <ConsumerProvidersStack.Screen
        name="ConsumerRequestAppointment"
        component={ConsumerRequestAppointmentScreen}
        options={{ title: 'Request appointment', headerBackTitle: 'Back' }}
      />
    </ConsumerProvidersStack.Navigator>
  );
}

function ConsumerMessagesTabStackScreen() {
  return (
    <ConsumerMessagesStack.Navigator screenOptions={screenOptions}>
      <ConsumerMessagesStack.Screen
        name="ConsumerMessages"
        component={ConsumerMessagesScreen}
        options={{ headerShown: false }}
      />
      <ConsumerMessagesStack.Screen
        name="ConsumerChatThread"
        component={ConsumerChatThreadScreen}
        options={({ route }) => ({ title: route.params?.username ?? 'Chat', headerBackTitle: 'Back' })}
      />
    </ConsumerMessagesStack.Navigator>
  );
}

function ConsumerAppointmentsTabStackScreen() {
  return (
    <ConsumerAppointmentsStack.Navigator screenOptions={screenOptions}>
      <ConsumerAppointmentsStack.Screen
        name="ConsumerAppointments"
        component={ConsumerAppointmentsScreen}
        options={{ headerShown: false }}
      />
    </ConsumerAppointmentsStack.Navigator>
  );
}

export function ConsumerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: typography.caption,
      }}
    >
      <Tab.Screen
        name="ConsumerHomeTab"
        component={ConsumerHomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon label="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ConsumerJobsTab"
        component={ConsumerJobsTabStackScreen}
        options={{
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ focused }) => <TabIcon label="📋" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ConsumerProvidersTab"
        component={ConsumerProvidersTabStackScreen}
        options={{
          tabBarLabel: 'Providers',
          tabBarIcon: ({ focused }) => <TabIcon label="👷" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ConsumerMessagesTab"
        component={ConsumerMessagesTabStackScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ focused }) => <TabIcon label="💬" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ConsumerAppointmentsTab"
        component={ConsumerAppointmentsTabStackScreen}
        options={{
          tabBarLabel: 'Appointments',
          tabBarIcon: ({ focused }) => <TabIcon label="📅" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: { alignItems: 'center', justifyContent: 'center' },
  tabIconText: { fontSize: 20, opacity: 0.7 },
  tabIconFocused: { opacity: 1 },
});
