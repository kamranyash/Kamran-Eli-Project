import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { MOCK_BOOKINGS } from '../data/mockBookings';
import type { Booking } from '../data/mockBookings';

type DayDetailRoute = RouteProp<{ DayDetail: { date: string } }, 'DayDetail'>;

function getDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export function DayDetailScreen() {
  const route = useRoute<DayDetailRoute>();
  const dateParam = route.params?.date ?? getDateKey(new Date());

  const date = useMemo(() => {
    const [y, m, d] = dateParam.split('-').map(Number);
    return new Date(y, (m ?? 1) - 1, d ?? 1);
  }, [dateParam]);

  const bookings = useMemo(() => {
    return MOCK_BOOKINGS.filter((b) => b.date === dateParam);
  }, [dateParam]);

  // Include the extra mock event from CalendarScreen (e.g. Gardening 1-2pm on 2026-01-15)
  const extraEvents = useMemo(() => {
    const d = new Date(2026, 0, 15);
    const key2 = getDateKey(d);
    if (dateParam === key2) {
      return [{ title: 'Gardening 1-2pm', time: '1:00 PM - 2:00 PM' }];
    }
    return [];
  }, [dateParam]);

  const headerLabel = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const hasBookings = bookings.length > 0;
  const hasExtra = extraEvents.length > 0;
  const hasAny = hasBookings || hasExtra;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.dateLabel}>{headerLabel}</Text>
        <Text style={styles.subtitle}>
          {hasAny
            ? `${bookings.length + extraEvents.length} ${bookings.length + extraEvents.length === 1 ? 'event' : 'events'}`
            : 'No events scheduled'}
        </Text>
      </View>

      {!hasAny && (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nothing on the calendar for this day.</Text>
        </View>
      )}

      {bookings.map((b: Booking) => (
        <View key={b.id} style={styles.card}>
          <Text style={styles.cardTitle}>{b.jobTitle ?? 'Job'}</Text>
          <Text style={styles.cardTime}>{b.time}</Text>
          <Text style={styles.cardClient}>{b.clientName}</Text>
          <Text style={styles.cardAddress}>{b.address}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardPrice}>${b.price}</Text>
            <Text style={styles.cardStatus}>{b.status}</Text>
          </View>
        </View>
      ))}

      {extraEvents.map((ev, i) => (
        <View key={`extra-${i}`} style={styles.card}>
          <Text style={styles.cardTitle}>{ev.title}</Text>
          <Text style={styles.cardTime}>{ev.time}</Text>
        </View>
      ))}
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
  header: {
    marginBottom: spacing.xl,
  },
  dateLabel: {
    ...typography.title,
    fontSize: 24,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  empty: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
  },
  cardTime: {
    ...typography.body,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  cardClient: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing.sm,
  },
  cardAddress: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cardPrice: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  cardStatus: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
});
