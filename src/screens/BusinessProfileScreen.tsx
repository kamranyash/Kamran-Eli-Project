import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { PrimaryButton } from '../components';
import { MOCK_BUSINESSES } from '../data/mockBusinesses';
import type { Business } from '../data/mockBusinesses';

type BusinessProfileRoute = RouteProp<{ BusinessProfile: { businessId: string } }, 'BusinessProfile'>;

interface BusinessProfileScreenProps {
  route: BusinessProfileRoute;
}

export function BusinessProfileScreen({ route }: BusinessProfileScreenProps) {
  const businessId = route.params?.businessId ?? '';
  const business = MOCK_BUSINESSES.find((b) => b.id === businessId);

  if (!business) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Business not found</Text>
      </View>
    );
  }

  const handleCall = () => {
    const tel = business.phone.replace(/\D/g, '');
    Linking.openURL(`tel:${tel}`).catch(() =>
      Alert.alert('Error', 'Could not open phone app')
    );
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${business.email}`).catch(() =>
      Alert.alert('Error', 'Could not open email app')
    );
  };

  const handleMessage = () => {
    Alert.alert('Message', `Open chat with ${business.name} (mock – would start a thread)`);
  };

  const handleRequestAppointment = () => {
    Alert.alert('Request appointment', `Request an appointment with ${business.name} (mock – would open booking flow)`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.photoSection}>
        <View style={styles.photoPlaceholder}>
          {business.photoUri ? (
            <Image source={{ uri: business.photoUri }} style={styles.photo} resizeMode="cover" />
          ) : (
            <Text style={styles.photoPlaceholderText}>Add photo</Text>
          )}
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.businessName}>{business.name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{business.category}</Text>
        </View>
        <Text style={styles.location}>📍 {business.location}</Text>
        <Text style={styles.description}>{business.description}</Text>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <TouchableOpacity onPress={handleCall} style={styles.contactRow}>
          <Text style={styles.contactIcon}>📞</Text>
          <Text style={styles.contactValue}>{business.phone}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEmail} style={styles.contactRow}>
          <Text style={styles.contactIcon}>✉️</Text>
          <Text style={styles.contactValue}>{business.email}</Text>
        </TouchableOpacity>
      </View>

      {business.services && business.services.length > 0 && (
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesWrap}>
            {business.services.map((s, i) => (
              <View key={i} style={styles.serviceChip}>
                <Text style={styles.serviceChipText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.actionsSection}>
        <PrimaryButton
          title="Send message"
          onPress={handleMessage}
          style={styles.actionButton}
          icon={<Text style={styles.actionIcon}>💬</Text>}
        />
        <PrimaryButton
          title="Request appointment"
          onPress={handleRequestAppointment}
          style={styles.actionButton}
          variant="outline"
          icon={<Text style={styles.actionIcon}>📅</Text>}
        />
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
  errorText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  photoPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
  },
  photoPlaceholderText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  infoSection: {
    marginBottom: spacing.xl,
  },
  businessName: {
    ...typography.title,
    fontSize: 24,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  categoryText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  location: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.text,
    lineHeight: 22,
  },
  contactSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  contactValue: {
    ...typography.body,
    color: colors.primary,
    flex: 1,
  },
  servicesSection: {
    marginBottom: spacing.xl,
  },
  servicesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  serviceChip: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceChipText: {
    ...typography.bodySmall,
    color: colors.text,
  },
  actionsSection: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    marginBottom: 0,
  },
  actionIcon: {
    fontSize: 18,
    marginRight: spacing.xs,
  },
});
