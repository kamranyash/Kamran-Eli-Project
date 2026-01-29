import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../theme';
import { BookingCard, IconButton } from '../components';
import { MOCK_BOOKINGS } from '../data/mockBookings';
import { MOCK_BUSINESSES } from '../data/mockBusinesses';
import { useNotifications } from '../context/NotificationsContext';
import type { Booking } from '../data/mockBookings';

const BUSINESS_NAME = 'Shayfer Gardening LLC';

type HomeStackParamList = {
  Home: undefined;
  ManageBooking: { booking: Booking };
  CreateBooking: undefined;
  Notifications: undefined;
  Account: undefined;
  BusinessProfile: { businessId: string };
};

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { unreadCount } = useNotifications();
  const [bookings] = useState(MOCK_BOOKINGS);

  const handleSwitchToPersonal = useCallback(() => {
    Alert.alert('Coming soon', 'Consumer mode coming soon');
  }, []);

  const handleOpenProfile = useCallback(() => {
    navigation.navigate('Account');
  }, [navigation]);

  const handleBookingPress = useCallback(
    (booking: Booking) => {
      navigation.navigate('ManageBooking', { booking });
    },
    [navigation]
  );

  const handleCreateBooking = useCallback(() => {
    navigation.navigate('CreateBooking');
  }, [navigation]);

  const handleNotifications = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);

  const handleCalendar = useCallback(() => {
    (navigation.getParent() as any)?.navigate('Calendar');
  }, [navigation]);

  const handleBusinessPress = useCallback(
    (businessId: string) => {
      navigation.navigate('BusinessProfile', { businessId });
    },
    [navigation]
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Text style={styles.businessAccount}>Business account</Text>
          <TouchableOpacity onPress={handleSwitchToPersonal}>
            <Text style={styles.switchLink}>Switch to personal</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topCenter}>
          <Text style={styles.helper}>Click to view messages from clients</Text>
        </View>
        <View style={styles.topRight}>
          <IconButton
            onPress={handleCalendar}
            icon={<Text style={styles.iconText}>📅</Text>}
          />
          <IconButton
            onPress={handleNotifications}
            icon={<Text style={styles.iconText}>🔔</Text>}
            badge={unreadCount > 0 ? unreadCount : undefined}
          />
          <IconButton onPress={() => {}} icon={<Text style={styles.iconText}>💬</Text>} />
        </View>
      </View>

      <View style={styles.accountSection}>
        <View style={styles.avatar} />
        <View style={styles.accountText}>
          <Text style={styles.businessName}>{BUSINESS_NAME}</Text>
          <Text style={styles.notifications}>
            {unreadCount === 0 ? 'No new notifications' : `${unreadCount} new notification${unreadCount === 1 ? '' : 's'}`}
          </Text>
          <TouchableOpacity onPress={handleOpenProfile}>
            <Text style={styles.profileLink}>Click to open profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Featured businesses</Text>
      <Text style={styles.sectionHint}>Tap a business to view their profile</Text>
      {MOCK_BUSINESSES.map((business) => (
        <TouchableOpacity
          key={business.id}
          style={styles.businessRow}
          onPress={() => handleBusinessPress(business.id)}
          activeOpacity={0.7}
        >
          <View style={styles.businessAvatar} />
          <View style={styles.businessInfo}>
            <Text style={styles.businessNameText}>{business.name}</Text>
            <Text style={styles.businessCategory}>{business.category} · {business.location}</Text>
          </View>
          <Text style={styles.businessChevron}>›</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Next Bookings:</Text>
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onPress={() => handleBookingPress(booking)}
        />
      ))}

      <TouchableOpacity
        onPress={handleCreateBooking}
        activeOpacity={0.9}
        style={styles.fab}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
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
    paddingBottom: 100,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  topLeft: {},
  businessAccount: {
    ...typography.h3,
    color: colors.text,
  },
  switchLink: {
    ...typography.link,
    color: colors.primary,
    textDecorationLine: 'underline',
    marginTop: spacing.xs,
  },
  topCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  helper: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconText: {
    fontSize: 22,
  },
  accountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.gray[400],
    marginRight: spacing.md,
  },
  accountText: {},
  businessName: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  notifications: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  profileLink: {
    ...typography.link,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionHint: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  businessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  businessAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray[300],
    marginRight: spacing.md,
  },
  businessInfo: {
    flex: 1,
  },
  businessNameText: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 2,
  },
  businessCategory: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  businessChevron: {
    fontSize: 24,
    color: colors.textSecondary,
    fontWeight: '300',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 36,
  },
});
