import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { ThreadRow } from '../components';
import { MOCK_THREADS } from '../data/mockThreads';
import type { Thread } from '../data/mockThreads';

export function MessagesScreen() {
  const navigation = useNavigation<any>();
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
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages"
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>
      <FlatList
        data={threads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThreadRow thread={item} onPress={() => handleThreadPress(item)} />
        )}
        contentContainerStyle={styles.list}
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingLeft: 40,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    position: 'absolute',
    left: spacing.lg,
    fontSize: 18,
  },
  list: {
    paddingBottom: 100,
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
