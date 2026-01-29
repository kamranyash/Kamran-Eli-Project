import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { MOCK_NOTIFICATIONS } from '../data/mockNotifications';
import { useNotifications } from '../context/NotificationsContext';
import type { Notification } from '../data/mockNotifications';

function NotificationCard({ item }: { item: Notification }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timeAgo}>{item.timeAgo}</Text>
    </View>
  );
}

export function NotificationsScreen() {
  const { markAllAsRead } = useNotifications();
  const notifications = MOCK_NOTIFICATIONS;

  // When user views this screen, mark all notifications as read so the bell badge goes to 0
  useFocusEffect(
    React.useCallback(() => {
      markAllAsRead();
    }, [markAllAsRead])
  );

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No notifications</Text>
          <Text style={styles.emptyText}>
            When there are changes to your bookings (reschedules, new bookings, cancellations), they’ll show up here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <NotificationCard item={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  message: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  timeAgo: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
