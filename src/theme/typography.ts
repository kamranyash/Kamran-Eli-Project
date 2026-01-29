import { Platform } from 'react-native';

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  title: 28,
};

export const fontWeights = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const typography = {
  title: {
    fontSize: fontSizes.title,
    fontWeight: fontWeights.bold,
  },
  h1: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
  },
  h2: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
  },
  h3: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
  },
  body: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.normal,
  },
  bodySmall: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
  },
  caption: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.normal,
  },
  link: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },
};
