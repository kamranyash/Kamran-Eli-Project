import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../theme';
import { useAppMode } from '../context/AppModeContext';
import { MOCK_JOB_POSTS } from '../data/mockJobPosts';
import { MOCK_APPOINTMENT_REQUESTS } from '../data/mockAppointmentRequests';

type ConsumerHomeStackParamList = {
  ConsumerHome: undefined;
  ConsumerJobDetail: { jobId: string };
};

export function ConsumerHomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ConsumerHomeStackParamList>>();
  const { switchToBusiness } = useAppMode();

  // Parent of the Home stack is the Tab navigator
  const tabNav = navigation.getParent() as any;

  const openJobs = useCallback(() => {
    tabNav?.navigate('ConsumerJobsTab');
  }, [tabNav]);

  const openProviders = useCallback(() => {
    tabNav?.navigate('ConsumerProvidersTab');
  }, [tabNav]);

  const openMessages = useCallback(() => {
    tabNav?.navigate('ConsumerMessagesTab');
  }, [tabNav]);

  const openAppointments = useCallback(() => {
    tabNav?.navigate('ConsumerAppointmentsTab');
  }, [tabNav]);

  const openJobDetail = useCallback(
    (jobId: string) => navigation.navigate('ConsumerJobDetail', { jobId }),
    [navigation]
  );

  const myJobs = MOCK_JOB_POSTS;
  const openJobsCount = myJobs.filter((j) => j.status === 'OPEN').length;
  const pendingAppointments = MOCK_APPOINTMENT_REQUESTS.filter(
    (a) => a.status === 'PENDING'
  ).length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Text style={styles.personalAccount}>Personal account</Text>
          <TouchableOpacity onPress={switchToBusiness}>
            <Text style={styles.switchLink}>Switch to business</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome back</Text>
        <Text style={styles.welcomeSubtitle}>
          Find providers, manage your jobs, and book appointments.
        </Text>
      </View>

      <View style={styles.cardGrid}>
        <TouchableOpacity style={styles.bigCard} onPress={openJobs} activeOpacity={0.8}>
          <Text style={styles.cardIcon}>📋</Text>
          <Text style={styles.cardTitle}>My jobs</Text>
          <Text style={styles.cardSubtitle}>
            {openJobsCount} open · {myJobs.length} total
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bigCard} onPress={openProviders} activeOpacity={0.8}>
          <Text style={styles.cardIcon}>👷</Text>
          <Text style={styles.cardTitle}>Find providers</Text>
          <Text style={styles.cardSubtitle}>Browse by skill & location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bigCard} onPress={openMessages} activeOpacity={0.8}>
          <Text style={styles.cardIcon}>💬</Text>
          <Text style={styles.cardTitle}>Messages</Text>
          <Text style={styles.cardSubtitle}>Chat with providers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bigCard} onPress={openAppointments} activeOpacity={0.8}>
          <Text style={styles.cardIcon}>📅</Text>
          <Text style={styles.cardTitle}>Appointments</Text>
          <Text style={styles.cardSubtitle}>
            {pendingAppointments} pending request{pendingAppointments !== 1 ? 's' : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {myJobs.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent jobs</Text>
          {myJobs.slice(0, 2).map((job) => (
            <TouchableOpacity
              key={job.id}
              style={styles.jobCard}
              onPress={() => openJobDetail(job.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.jobCardTitle}>{job.title}</Text>
              <Text style={styles.jobCardMeta}>
                {job.category} · {job.status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxl },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  topLeft: {},
  personalAccount: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  switchLink: {
    ...typography.link,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  welcomeSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  welcomeTitle: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  cardGrid: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  bigCard: {
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
  cardIcon: { fontSize: 32, marginBottom: spacing.sm },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
  },
  jobCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  jobCardTitle: { ...typography.body, fontWeight: '600', color: colors.text },
  jobCardMeta: { ...typography.caption, color: colors.textSecondary, marginTop: spacing.xs },
});
