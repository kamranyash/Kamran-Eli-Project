import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { JobListingCard } from '../components';
import { MOCK_JOB_LISTINGS } from '../data/mockJobListings';
import type { JobListing } from '../data/mockJobListings';

const appliedIds = new Set<string>();

export function JobListingsScreen() {
  const [search, setSearch] = useState('');
  const [applied, setApplied] = useState<Set<string>>(appliedIds);
  const listings = MOCK_JOB_LISTINGS.filter(
    (l) =>
      l.description.toLowerCase().includes(search.toLowerCase()) ||
      l.clientName.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (listing: JobListing) => {
    applied.add(listing.id);
    setApplied(new Set(applied));
    Alert.alert('Applied', `You applied for the job from ${listing.clientName} (mock)`);
  };

  const handleDetails = (listing: JobListing) => {
    Alert.alert(
      listing.clientName,
      `${listing.description}\n\nLocation: ${listing.location}\nCategory: ${listing.category}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Listings</Text>
      <View style={styles.searchRow}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Option to filter search"
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <JobListingCard
            listing={item}
            onAddPress={() => handleAdd(item)}
            onDetailsPress={() => handleDetails(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
});
