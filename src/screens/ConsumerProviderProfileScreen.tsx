import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { PrimaryButton } from '../components';
import { MOCK_PROVIDERS } from '../data/mockProviders';
import { MOCK_THREADS } from '../data/mockThreads';
import { MOCK_APPOINTMENT_REQUESTS } from '../data/mockAppointmentRequests';

type ConsumerProviderProfileParams = {
  ConsumerProviderProfile: { providerId: string };
};

export function ConsumerProviderProfileScreen() {
  const route = useRoute<RouteProp<ConsumerProviderProfileParams, 'ConsumerProviderProfile'>>();
  const navigation = useNavigation<any>();
  const providerId = route.params?.providerId ?? '';
  const provider = MOCK_PROVIDERS.find((p) => p.id === providerId);

  const handleMessage = useCallback(() => {
    if (!provider) return;
    const threadId = `thread-${provider.id}`;
    const username = provider.businessName;
    const tabNav = (navigation.getParent() as any)?.getParent?.();
    if (tabNav?.navigate) {
      tabNav.navigate('ConsumerMessagesTab', {
        screen: 'ConsumerChatThread',
        params: { threadId, username },
      });
    } else {
      (navigation as any).navigate('ConsumerChatThread', { threadId, username });
    }
  }, [provider, navigation]);

  const handleRequestAppointment = useCallback(() => {
    if (!provider) return;
    (navigation as any).navigate('ConsumerRequestAppointment', { providerId: provider.id });
  }, [provider, navigation]);

  if (!provider) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Provider not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.name}>{provider.businessName}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{provider.category}</Text>
        </View>
        <Text style={styles.area}>📍 {provider.serviceArea}</Text>
        {provider.hourlyRate != null && (
          <Text style={styles.rate}>${provider.hourlyRate}/hr</Text>
        )}
        <Text style={styles.bio}>{provider.bio}</Text>
      </View>

      {provider.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills & services</Text>
          <View style={styles.chips}>
            {provider.skills.map((s, i) => (
              <View key={i} style={styles.chip}>
                <Text style={styles.chipText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.actions}>
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
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  name: { ...typography.h2, color: colors.text, marginBottom: spacing.sm },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  categoryText: { ...typography.caption, color: colors.white, fontWeight: '600' },
  area: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.xs },
  rate: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  bio: { ...typography.body, color: colors.text, lineHeight: 22 },
  section: { marginBottom: spacing.lg },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    backgroundColor: colors.gray[200],
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  chipText: { ...typography.bodySmall, color: colors.text },
  actions: { gap: spacing.md },
  actionButton: {},
  actionIcon: { fontSize: 18, marginRight: spacing.xs },
  errorText: { ...typography.body, color: colors.error, padding: spacing.lg },
});
