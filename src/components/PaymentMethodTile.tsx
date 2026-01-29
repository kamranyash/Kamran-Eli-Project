import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';

interface PaymentMethodTileProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
}

export function PaymentMethodTile({ label, selected, onPress, icon }: PaymentMethodTileProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.tile, selected && styles.tileSelected]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minHeight: 80,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },
  tileSelected: {
    borderColor: colors.zelle,
    backgroundColor: colors.zelle,
  },
  icon: {
    marginBottom: spacing.xs,
  },
  text: {
    ...typography.bodySmall,
    color: colors.text,
  },
  textSelected: {
    color: colors.white,
  },
});
