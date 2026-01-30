import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, typography } from '../theme';
import { MOCK_APPOINTMENT_REQUESTS } from '../data/mockAppointmentRequests';
import type { AppointmentRequest } from '../data/mockAppointmentRequests';

const CONSUMER_ID = 'consumer-1';

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function AppointmentCard({
  item,
  onPress,
}: {
  item: AppointmentRequest;
  onPress: () => void;
}) {
  const statusColor =
    item.status === 'PENDING'
      ? colors.primary
      : item.status === 'CONFIRMED'
        ? colors.success
        : item.status === 'DECLINED' || item.status === 'CANCELLED'
          ? colors.error
          : colors.gray[500];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.providerName}>{item.providerName}</Text>
      <Text style={styles.time}>{formatDateTime(item.startTime)}</Text>
      <View style={[styles.statusChip, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function ConsumerAppointmentsScreen() {
  const navigation = useNavigation();
  const appointments = MOCK_APPOINTMENT_REQUESTS.filter(
    (a) => a.consumerId === CONSUMER_ID
  );
  const upcoming = appointments.filter(
    (a) => a.status === 'PENDING' || a.status === 'CONFIRMED'
  );
  const past = appointments.filter(
    (a) => a.status === 'DECLINED' || a.status === 'CANCELLED'
  );

  const handlePress = useCallback(() => {}, []);

  if (appointments.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📅</Text>
          <Text style={styles.emptyTitle}>No appointments yet</Text>
          <Text style={styles.emptySubtitle}>
            Request an appointment from a provider's profile.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Appointments</Text>
      {upcoming.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          {upcoming.map((item) => (
            <AppointmentCard key={item.id} item={item} onPress={handlePress} />
          ))}
        </>
      )}
      {past.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Past</Text>
          {past.map((item) => (
            <AppointmentCard key={item.id} item={item} onPress={handlePress} />
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: {
    ...typography.h1,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  scrollContent: { paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  providerName: { ...typography.h3, color: colors.text, marginBottom: spacing.xs },
  time: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.sm },
  statusChip: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
  },
  statusText: { ...typography.caption, color: colors.white, fontWeight: '600' },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: { ...typography.h2, color: colors.text, marginBottom: spacing.xs },
  emptySubtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
});
