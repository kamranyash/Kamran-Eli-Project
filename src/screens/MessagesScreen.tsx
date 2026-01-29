import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, typography } from '../theme';
import { ThreadRow } from '../components';
import { MOCK_THREADS } from '../data/mockThreads';
import type { Thread } from '../data/mockThreads';

type MessagesStackParamList = {
  Messages: undefined;
  ChatThread: { threadId: string; username: string };
  NewChat: undefined;
};

export function MessagesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MessagesStackParamList>>();
  const [search, setSearch] = useState('');
  const threads = MOCK_THREADS.filter((t) =>
    t.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleThreadPress = (thread: Thread) => {
    navigation.navigate('ChatThread', {
      threadId: thread.id,
      username: thread.username,
    });
  };

  const handleNewChat = () => {
    navigation.navigate('NewChat');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View style={styles.searchRow}>
        <View style={styles.searchIconWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages"
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={threads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThreadRow thread={item} onPress={() => handleThreadPress(item)} />
        )}
        contentContainerStyle={[
          styles.list,
          threads.length === 0 && styles.listEmpty,
        ]}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No conversations match your search.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        onPress={handleNewChat}
        activeOpacity={0.9}
        style={styles.fab}
      >
        <Text style={styles.fabIcon}>💬</Text>
        <View style={styles.fabPlus}>
          <Text style={styles.fabPlusText}>+</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.fabHint}>Create a new chat with a number or invite link</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  searchIconWrap: {
    position: 'absolute',
    left: spacing.md + 12,
    zIndex: 1,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingLeft: 44,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  list: {
    paddingBottom: 100,
  },
  listEmpty: {
    flexGrow: 1,
  },
  empty: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
  },
  fabPlus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabPlusText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
  },
  fabHint: {
    position: 'absolute',
    bottom: spacing.xl + 60,
    right: spacing.lg,
    ...typography.caption,
    color: colors.textSecondary,
    maxWidth: 160,
    textAlign: 'right',
  },
});
