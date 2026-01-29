import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled,
  icon,
}: PrimaryButtonProps) {
  const variantStyles = {
    primary: { bg: colors.primary, text: colors.white },
    secondary: { bg: colors.primary, text: colors.white, opacity: 0.9 },
    danger: { bg: colors.error, text: colors.white },
    outline: { bg: colors.card, text: colors.text, borderWidth: 1, borderColor: colors.border },
  };
  const v = variantStyles[variant];
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: v.bg,
          borderWidth: (v as { borderWidth?: number }).borderWidth ?? 0,
          borderColor: (v as { borderColor?: string }).borderColor,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {icon ? <>{icon}</> : null}
      <Text style={[styles.text, { color: v.text }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  text: {
    ...typography.h3,
    fontSize: 16,
  },
});
