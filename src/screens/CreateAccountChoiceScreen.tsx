import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';

interface CreateAccountChoiceScreenProps {
  onSelectBusiness: () => void;
  onSelectPersonal: () => void;
  onBack: () => void;
}

export function CreateAccountChoiceScreen({
  onSelectBusiness,
  onSelectPersonal,
  onBack,
}: CreateAccountChoiceScreenProps) {
  const handlePersonal = () => {
    Alert.alert('Coming soon', 'Personal accounts are not available yet. Use Business for now.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Choose your account type</Text>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={onSelectBusiness}
          activeOpacity={0.8}
        >
          <Text style={styles.optionIcon}>🏢</Text>
          <Text style={styles.optionTitle}>Business</Text>
          <Text style={styles.optionDesc}>
            For service providers: painters, gardeners, landscapers, and other professionals.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionCard, styles.optionCardDisabled]}
          onPress={handlePersonal}
          activeOpacity={0.8}
        >
          <Text style={styles.optionIcon}>👤</Text>
          <Text style={styles.optionTitle}>Personal</Text>
          <Text style={styles.optionDesc}>
            For customers looking to book services. Coming soon.
          </Text>
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>Coming soon</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBack} style={styles.backWrap}>
          <Text style={styles.backLink}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  content: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionCardDisabled: {
    opacity: 0.85,
  },
  optionIcon: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  optionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  optionDesc: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  comingSoonBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gray[300],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginTop: spacing.sm,
  },
  comingSoonText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  backWrap: {
    alignSelf: 'center',
    marginTop: spacing.xl,
  },
  backLink: {
    ...typography.link,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
