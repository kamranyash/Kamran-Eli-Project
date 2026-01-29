import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, typography } from '../theme';
import { PrimaryButton } from '../components';
import type { Booking } from '../data/mockBookings';

type ManageBookingParams = {
  ManageBooking: { booking: Booking };
};

export function ManageBookingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ManageBookingParams>>();
  const tabNav = useNavigation();
  const route = useRoute<RouteProp<ManageBookingParams, 'ManageBooking'>>();
  const { booking } = route.params;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleMarkCompleted = useCallback(() => {
    Alert.alert('Done', 'Booking marked as completed (mock)');
    navigation.goBack();
  }, [navigation]);

  const handleReschedule = useCallback(() => {
    Alert.alert('Reschedule', 'Reschedule flow (mock)');
  }, []);

  const handleRequestPayment = useCallback(() => {
    const parent = navigation.getParent();
    (parent as any)?.navigate('Payments', {
      amount: booking.price,
      clientName: booking.clientName,
      bookingId: booking.id,
    });
    navigation.goBack();
  }, [navigation, booking]);

  const handleMessageClient = useCallback(() => {
    const parent = navigation.getParent();
    (parent as any)?.navigate('Messages', {
      screen: 'ChatThread',
      params: { threadId: booking.id, username: booking.clientName },
    });
    navigation.goBack();
  }, [navigation, booking]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.detailRow}>
          <Text style={styles.icon}>📍</Text>
          <View>
            <Text style={styles.jobTitle}>{booking.jobTitle || 'Appointment'}</Text>
            <Text style={styles.address}>{booking.address}</Text>
            <Text style={styles.client}>Client: {booking.clientName}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.icon}>📅</Text>
          <View>
            <Text style={styles.body}>{formatDate(booking.date)}</Text>
            <Text style={styles.body}>{booking.time}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleRequestPayment}
          style={styles.paymentRow}
          activeOpacity={0.8}
        >
          <Text style={styles.paymentText}>
            Payment: {booking.status === 'incomplete' ? 'Pending' : booking.status} ($
            {booking.price})
          </Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton
        title="Reschedule Appointment"
        onPress={handleReschedule}
        variant="primary"
        style={styles.button}
        icon={<Text style={styles.buttonIcon}>🔄</Text>}
      />
      <PrimaryButton
        title="Edit Appointment Details"
        onPress={() => Alert.alert('Edit', 'Edit flow (mock)')}
        variant="outline"
        style={styles.button}
        icon={<Text style={styles.buttonIcon}>✏️</Text>}
      />
      <PrimaryButton
        title="Mark as Completed"
        onPress={handleMarkCompleted}
        variant="primary"
        style={styles.button}
        icon={<Text style={styles.buttonIcon}>✓</Text>}
      />
      <PrimaryButton
        title="Message Client"
        onPress={handleMessageClient}
        variant="outline"
        style={styles.button}
        icon={<Text style={styles.buttonIcon}>💬</Text>}
      />
      <PrimaryButton
        title="Cancel Appointment"
        onPress={() => {
          Alert.alert('Cancel', 'Cancel appointment?', [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', style: 'destructive', onPress: () => navigation.goBack() },
          ]);
        }}
        variant="danger"
        style={styles.button}
        icon={<Text style={styles.buttonIcon}>🗑</Text>}
      />
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
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  jobTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  address: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  client: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  body: {
    ...typography.body,
    color: colors.text,
  },
  paymentRow: {
    backgroundColor: '#FEF08A',
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    marginTop: spacing.sm,
  },
  paymentText: {
    ...typography.h3,
    color: colors.text,
  },
  paymentHint: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  button: {
    marginBottom: spacing.md,
  },
  buttonIcon: {
    fontSize: 18,
  },
});
