import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme';

interface IconButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  /** Show red dot with this number. Omit or pass 0 to hide the badge. */
  badge?: number | string;
  style?: ViewStyle;
}

export function IconButton({ onPress, icon, badge, style }: IconButtonProps) {
  const showBadge = badge != null && badge !== 0 && badge !== '0';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.wrapper, style]}>
      <View style={styles.iconWrap}>{icon}</View>
      {showBadge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText} numberOfLines={1}>
            {Number(badge) > 99 ? '99+' : String(badge)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    padding: spacing.sm,
  },
  iconWrap: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.badge,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
});
