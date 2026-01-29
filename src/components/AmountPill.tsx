import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';

interface AmountPillProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function AmountPill({ label, selected, onPress }: AmountPillProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.pill, selected && styles.pillSelected]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[200],
  },
  pillSelected: {
    backgroundColor: colors.gray[600],
  },
  text: {
    ...typography.body,
    color: colors.text,
  },
  textSelected: {
    color: colors.white,
  },
});
