import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, typography } from '../theme';
import { MOCK_NOTIFICATIONS } from '../data/mockNotifications';
import { useNotifications } from '../context/NotificationsContext';
import type { Notification } from '../data/mockNotifications';

type HomeStackParamList = {
  Notifications: undefined;
  NotificationDetail: { notification: Notification };
};

function NotificationCard({
  item,
  isUnread,
  onPress,
}: {
  item: Notification;
  isUnread: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {isUnread && <View style={styles.unreadDot} />}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timeAgo}>{item.timeAgo}</Text>
    </TouchableOpacity>
  );
}

export function NotificationsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { isRead } = useNotifications();
  const notifications = MOCK_NOTIFICATIONS;

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
          renderItem={({ item }) => (
            <NotificationCard
              item={item}
              isUnread={!isRead(item.id)}
              onPress={() => navigation.navigate('NotificationDetail', { notification: item })}
            />
          )}
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
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.badge,
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
