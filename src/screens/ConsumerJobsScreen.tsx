import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../theme';
import { MOCK_JOB_POSTS } from '../data/mockJobPosts';
import type { JobPost } from '../data/mockJobPosts';

type ConsumerJobsStackParamList = {
  ConsumerJobs: undefined;
  ConsumerNewJob: undefined;
  ConsumerJobDetail: { jobId: string };
};

const CONSUMER_ID = 'consumer-1';

export function ConsumerJobsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ConsumerJobsStackParamList>>();
  const jobs = MOCK_JOB_POSTS.filter((j) => j.consumerId === CONSUMER_ID);

  const handleNewJob = useCallback(() => {
    navigation.navigate('ConsumerNewJob');
  }, [navigation]);

  const handleJobPress = useCallback(
    (jobId: string) => {
      navigation.navigate('ConsumerJobDetail', { jobId });
    },
    [navigation]
  );

  const renderItem = ({ item }: { item: JobPost }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleJobPress(item.id)}
      activeOpacity={0.8}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardMeta}>
        {item.category} · {item.locationText}
      </Text>
      <View style={[styles.statusChip, { backgroundColor: statusColor(item.status) }]}>
        <Text style={styles.statusText}>{item.status.replace('_', ' ')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My jobs</Text>
        <TouchableOpacity onPress={handleNewJob} style={styles.newButton}>
          <Text style={styles.newButtonText}>+ New job</Text>
        </TouchableOpacity>
      </View>
      {jobs.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyTitle}>No job posts yet</Text>
          <Text style={styles.emptySubtitle}>Post a job to find providers.</Text>
          <TouchableOpacity onPress={handleNewJob} style={styles.emptyButton}>
            <Text style={styles.emptyButtonText}>Post a job</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

function statusColor(status: string): string {
  switch (status) {
    case 'OPEN':
      return colors.primary;
    case 'IN_PROGRESS':
      return colors.success;
    case 'FILLED':
      return colors.gray[400];
    case 'CANCELLED':
      return colors.error;
    default:
      return colors.gray[300];
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: { ...typography.h1, color: colors.text },
  newButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  newButtonText: { ...typography.body, fontWeight: '600', color: colors.primary },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.xs },
  cardMeta: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.sm },
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
  emptySubtitle: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.lg },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
  },
  emptyButtonText: { ...typography.body, fontWeight: '600', color: colors.white },
});
