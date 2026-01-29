import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';
import type { Booking } from '../data/mockBookings';

interface BookingCardProps {
  booking: Booking;
  onPress: () => void;
}

function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(2)}`;
}

export function BookingCard({ booking, onPress }: BookingCardProps) {
  const dueDate = formatDisplayDate(booking.date);
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      <Text style={styles.line1}>
        Job at {booking.address} - {booking.clientName}
      </Text>
      <Text style={styles.line2}>
        <Text style={styles.statusRed}>Status : </Text>
        <Text style={styles.statusValue}>{booking.status}</Text>
        <Text style={styles.due}> (Due {dueDate})</Text>
      </Text>
      <Text style={styles.line3}>
        Payment - {booking.paymentMethod} - ${booking.price}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  line1: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  line2: {
    ...typography.bodySmall,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statusRed: {
    color: colors.error,
    fontWeight: '600',
  },
  statusValue: {
    color: colors.text,
  },
  due: {
    color: colors.textSecondary,
  },
  line3: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});
