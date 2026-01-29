import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';
import type { JobListing } from '../data/mockJobListings';

interface JobListingCardProps {
  listing: JobListing;
  onAddPress: () => void;
  onDetailsPress: () => void;
}

export function JobListingCard({ listing, onAddPress, onDetailsPress }: JobListingCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{listing.clientName.charAt(0)}</Text>
        </View>
        <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
          <Text style={styles.addText}>Add +</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{listing.description}</Text>
      <TouchableOpacity onPress={onDetailsPress}>
        <Text style={styles.detailsLink}>Click for Additional Details</Text>
      </TouchableOpacity>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>Image</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    ...typography.h2,
    color: colors.text,
  },
  addButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  addText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.primary,
  },
  description: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  detailsLink: {
    ...typography.link,
    color: colors.primary,
    textDecorationLine: 'underline',
    marginBottom: spacing.md,
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: colors.gray[200],
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});
