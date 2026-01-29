import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { useNotifications } from '../context/NotificationsContext';
import type { Notification } from '../data/mockNotifications';

type NotificationDetailParams = {
  NotificationDetail: { notification: Notification };
};

export function NotificationDetailScreen() {
  const route = useRoute<RouteProp<NotificationDetailParams, 'NotificationDetail'>>();
  const { notification } = route.params;
  const { markAsRead } = useNotifications();

  useFocusEffect(
    React.useCallback(() => {
      markAsRead(notification.id);
    }, [notification.id, markAsRead])
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <Text style={styles.timeAgo}>{notification.timeAgo}</Text>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.message}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  timeAgo: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
  },
  message: {
    ...typography.body,
    color: colors.text,
    lineHeight: 24,
  },
});
