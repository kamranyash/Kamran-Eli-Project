import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../theme';
import { ThreadRow } from '../components';
import { MOCK_THREADS } from '../data/mockThreads';
import type { Thread } from '../data/mockThreads';

type ConsumerMessagesStackParamList = {
  ConsumerMessages: undefined;
  ConsumerChatThread: { threadId: string; username: string };
};

export function ConsumerMessagesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ConsumerMessagesStackParamList>>();
  const threads = MOCK_THREADS;

  const handleThreadPress = useCallback(
    (thread: Thread) => {
      navigation.navigate('ConsumerChatThread', {
        threadId: thread.id,
        username: thread.username,
      });
    },
    [navigation]
  );

  if (threads.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>💬</Text>
          <Text style={styles.emptyTitle}>No messages yet</Text>
          <Text style={styles.emptySubtitle}>
            Message a provider from their profile to start a conversation.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={threads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThreadRow thread={item} onPress={() => handleThreadPress(item)} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: {
    ...typography.h1,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  list: { paddingBottom: spacing.xxl },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: { ...typography.h2, color: colors.text, marginBottom: spacing.xs },
  emptySubtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
});
