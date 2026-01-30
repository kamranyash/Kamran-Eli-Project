import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors, spacing, typography } from '../theme';
import { PrimaryButton } from '../components';
import { MOCK_JOB_POSTS } from '../data/mockJobPosts';
import type { JobPost } from '../data/mockJobPosts';

type ConsumerJobDetailParams = {
  ConsumerJobDetail: { jobId: string };
};

export function ConsumerJobDetailScreen() {
  const route = useRoute<RouteProp<ConsumerJobDetailParams, 'ConsumerJobDetail'>>();
  const navigation = useNavigation();
  const jobId = route.params?.jobId ?? '';
  const job = MOCK_JOB_POSTS.find((j) => j.id === jobId);

  const handleMarkFilled = useCallback(() => {
    if (!job) return;
    (job as JobPost).status = 'FILLED';
    Alert.alert('Done', 'Job marked as filled.');
    navigation.goBack();
  }, [job, navigation]);

  const handleCancel = useCallback(() => {
    Alert.alert(
      'Cancel job',
      'Are you sure you want to cancel this job post?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, cancel',
          style: 'destructive',
          onPress: () => {
            if (job) (job as JobPost).status = 'CANCELLED';
            navigation.goBack();
          },
        },
      ]
    );
  }, [job, navigation]);

  if (!job) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Job not found</Text>
      </View>
    );
  }

  const canEdit = job.status === 'OPEN' || job.status === 'IN_PROGRESS';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{job.status.replace('_', ' ')}</Text>
        </View>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.meta}>{job.category} · {job.locationText}</Text>
        <Text style={styles.description}>{job.description}</Text>
        {(job.budgetMin != null || job.budgetMax != null) && (
          <Text style={styles.budget}>
            Budget: ${job.budgetMin ?? '?'} – ${job.budgetMax ?? '?'}
          </Text>
        )}
        {job.dueDate && (
          <Text style={styles.due}>Due: {job.dueDate}</Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>Messages</Text>
      <Text style={styles.hint}>
        Messages about this job will appear here. Open Messages tab to chat with providers.
      </Text>

      {canEdit && (
        <View style={styles.actions}>
          <PrimaryButton
            title="Mark as filled"
            onPress={handleMarkFilled}
            style={styles.actionButton}
          />
          <PrimaryButton
            title="Cancel job"
            onPress={handleCancel}
            variant="danger"
            style={styles.actionButton}
          />
        </View>
      )}
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
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  statusText: { ...typography.caption, color: colors.white, fontWeight: '600' },
  title: { ...typography.h2, color: colors.text, marginBottom: spacing.xs },
  meta: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.sm },
  description: { ...typography.body, color: colors.text, lineHeight: 22 },
  budget: { ...typography.body, color: colors.text, marginTop: spacing.sm },
  due: { ...typography.bodySmall, color: colors.textSecondary, marginTop: spacing.xs },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  hint: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.lg },
  actions: { gap: spacing.md },
  actionButton: {},
  errorText: { ...typography.body, color: colors.error, padding: spacing.lg },
});
