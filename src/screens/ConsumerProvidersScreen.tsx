import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, typography } from '../theme';
import { MOCK_PROVIDERS } from '../data/mockProviders';
import type { ProviderProfile } from '../data/mockProviders';

type ConsumerProvidersStackParamList = {
  ConsumerProviders: undefined;
  ConsumerProviderProfile: { providerId: string };
};

export function ConsumerProvidersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ConsumerProvidersStackParamList>>();
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const filtered = useMemo(() => {
    let list = MOCK_PROVIDERS;
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.businessName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    const loc = locationFilter.trim().toLowerCase();
    if (loc) {
      list = list.filter(
        (p) =>
          p.location.toLowerCase().includes(loc) ||
          p.serviceArea.toLowerCase().includes(loc)
      );
    }
    return list;
  }, [search, locationFilter]);

  const handleProviderPress = useCallback(
    (providerId: string) => {
      navigation.navigate('ConsumerProviderProfile', { providerId });
    },
    [navigation]
  );

  const renderItem = ({ item }: { item: ProviderProfile }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleProviderPress(item.id)}
      activeOpacity={0.8}
    >
      <Text style={styles.cardTitle}>{item.businessName}</Text>
      <Text style={styles.cardCategory}>{item.category}</Text>
      <View style={styles.chips}>
        {item.skills.slice(0, 3).map((s, i) => (
          <View key={i} style={styles.chip}>
            <Text style={styles.chipText}>{s}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.cardMeta}>
        {item.hourlyRate != null ? `$${item.hourlyRate}/hr` : ''} · {item.serviceArea}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by skill or name"
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      <View style={styles.filterRow}>
        <TextInput
          style={styles.filterInput}
          placeholder="Filter by location"
          placeholderTextColor={colors.textSecondary}
          value={locationFilter}
          onChangeText={setLocationFilter}
        />
      </View>
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>👷</Text>
          <Text style={styles.emptyTitle}>No providers match</Text>
          <Text style={styles.emptySubtitle}>Try a different search or location.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchRow: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: { fontSize: 18, marginRight: spacing.sm },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  filterRow: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  filterInput: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
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
  cardCategory: { ...typography.bodySmall, color: colors.primary, marginBottom: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.sm },
  chip: {
    backgroundColor: colors.gray[200],
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
  },
  chipText: { ...typography.caption, color: colors.text },
  cardMeta: { ...typography.bodySmall, color: colors.textSecondary },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: { ...typography.h2, color: colors.text, marginBottom: spacing.xs },
  emptySubtitle: { ...typography.body, color: colors.textSecondary },
});
