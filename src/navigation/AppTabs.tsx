import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { HomeScreen } from '../screens/HomeScreen';
import { ManageBookingScreen } from '../screens/ManageBookingScreen';
import { CreateBookingScreen } from '../screens/CreateBookingScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { DayDetailScreen } from '../screens/DayDetailScreen';
import { MessagesScreen } from '../screens/MessagesScreen';
import { ChatThreadScreen } from '../screens/ChatThreadScreen';
import { NewChatScreen } from '../screens/NewChatScreen';
import { JobListingsScreen } from '../screens/JobListingsScreen';
import { PaymentsScreen } from '../screens/PaymentsScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { BusinessProfileScreen } from '../screens/BusinessProfileScreen';
import type { Booking } from '../data/mockBookings';

export type HomeStackParamList = {
  Home: undefined;
  ManageBooking: { booking: Booking };
  CreateBooking: undefined;
  Notifications: undefined;
  Account: undefined;
  BusinessProfile: { businessId: string };
};

export type MessagesStackParamList = {
  Messages: undefined;
  ChatThread: { threadId: string; username: string };
  NewChat: undefined;
};

export type PaymentsStackParamList = {
  Payments: { amount?: number; clientName?: string; bookingId?: string };
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
export type CalendarStackParamList = {
  Calendar: undefined;
  DayDetail: { date: string };
};
const CalendarStack = createNativeStackNavigator<CalendarStackParamList>();
const MessagesStack = createNativeStackNavigator<MessagesStackParamList>();
const JobListingsStack = createNativeStackNavigator<{ JobListings: undefined }>();
const PaymentsStack = createNativeStackNavigator<PaymentsStackParamList>();

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.text,
  headerTitleStyle: typography.h3,
  contentStyle: { backgroundColor: colors.background },
};

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ManageBooking"
        component={ManageBookingScreen}
        options={{ title: 'Manage Bookings', headerBackTitle: 'Back' }}
      />
      <HomeStack.Screen
        name="CreateBooking"
        component={CreateBookingScreen}
        options={{ title: 'Create Booking', headerBackTitle: 'Back' }}
      />
      <HomeStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Notifications', headerBackTitle: 'Back' }}
      />
      <HomeStack.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: 'Account', headerBackTitle: 'Back' }}
      />
      <HomeStack.Screen
        name="BusinessProfile"
        component={BusinessProfileScreen}
        options={({ route }) => ({
          title: 'Business',
          headerBackTitle: 'Back',
        })}
      />
    </HomeStack.Navigator>
  );
}

function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator screenOptions={screenOptions}>
      <CalendarStack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <CalendarStack.Screen
        name="DayDetail"
        component={DayDetailScreen}
        options={({ route }) => {
          const dateStr = route.params?.date;
          const title = dateStr
            ? (() => {
                const [y, m, d] = dateStr.split('-').map(Number);
                const d2 = new Date(y, (m ?? 1) - 1, d ?? 1);
                return d2.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
              })()
            : 'Day';
          return { title, headerBackTitle: 'Back' };
        }}
      />
    </CalendarStack.Navigator>
  );
}

function MessagesStackScreen() {
  return (
    <MessagesStack.Navigator screenOptions={screenOptions}>
      <MessagesStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ headerShown: false }}
      />
      <MessagesStack.Screen
        name="ChatThread"
        component={ChatThreadScreen}
        options={({ route }) => ({ title: route.params?.username ?? 'Chat' })}
      />
      <MessagesStack.Screen
        name="NewChat"
        component={NewChatScreen}
        options={{ title: 'New Chat' }}
      />
    </MessagesStack.Navigator>
  );
}

function JobListingsStackScreen() {
  return (
    <JobListingsStack.Navigator screenOptions={screenOptions}>
      <JobListingsStack.Screen
        name="JobListings"
        component={JobListingsScreen}
        options={{ headerShown: false }}
      />
    </JobListingsStack.Navigator>
  );
}

function PaymentsStackScreen() {
  return (
    <PaymentsStack.Navigator screenOptions={screenOptions}>
      <PaymentsStack.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{ headerShown: false }}
      />
    </PaymentsStack.Navigator>
  );
}

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <View style={styles.tabIcon}>
      <Text style={[styles.tabIconText, focused && styles.tabIconFocused]}>{label}</Text>
    </View>
  );
}

export function AppTabs() {
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
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon label="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStackScreen}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ focused }) => <TabIcon label="📅" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesStackScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ focused }) => <TabIcon label="💬" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="JobListings"
        component={JobListingsStackScreen}
        options={{
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ focused }) => <TabIcon label="📋" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentsStackScreen}
        options={{
          tabBarLabel: 'Payments',
          tabBarIcon: ({ focused }) => <TabIcon label="💰" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconText: {
    fontSize: 20,
    opacity: 0.7,
  },
  tabIconFocused: {
    opacity: 1,
  },
});
