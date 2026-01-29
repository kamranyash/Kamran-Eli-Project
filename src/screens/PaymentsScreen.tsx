import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { AmountPill, PaymentMethodTile, PrimaryButton } from '../components';

type PaymentsParams = {
  Payments: {
    amount?: number;
    clientName?: string;
    bookingId?: string;
  };
};

const AMOUNTS = [25, 50, 100];
const PAYMENT_METHODS = ['Venmo', 'Zelle', 'Card', 'Cash'];

export function PaymentsScreen() {
  const route = useRoute<RouteProp<PaymentsParams, 'Payments'>>();
  const params = route.params ?? {};
  const prefilledAmount = params.amount;

  const [amount, setAmount] = useState<number>(prefilledAmount ?? 100);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('Zelle');
  const [useCustom, setUseCustom] = useState(!!prefilledAmount && !AMOUNTS.includes(prefilledAmount));

  useEffect(() => {
    if (prefilledAmount != null) {
      if (AMOUNTS.includes(prefilledAmount)) {
        setAmount(prefilledAmount);
        setUseCustom(false);
      } else {
        setAmount(prefilledAmount);
        setCustomAmount(String(prefilledAmount));
        setUseCustom(true);
      }
    }
  }, [prefilledAmount]);

  const effectiveAmount = useCustom ? (parseFloat(customAmount) || 0) : amount;

  const handleRequest = () => {
    const value = useCustom ? parseFloat(customAmount) : amount;
    if (value <= 0) {
      Alert.alert('Error', 'Please choose or enter a valid amount');
      return;
    }
    Alert.alert('Payment request sent (mock)', `Requested $${value.toFixed(2)} via ${selectedMethod}`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>Request Payment</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Choose Amount</Text>
        <View style={styles.pills}>
          {AMOUNTS.map((a) => (
            <AmountPill
              key={a}
              label={`${a}$`}
              selected={!useCustom && amount === a}
              onPress={() => {
                setAmount(a);
                setUseCustom(false);
              }}
            />
          ))}
          <AmountPill
            label="Custom"
            selected={useCustom}
            onPress={() => setUseCustom(true)}
          />
        </View>
        {useCustom && (
          <View style={styles.customRow}>
            <Text style={styles.customLabel}>Custom amount ($):</Text>
            <TextInput
              style={styles.customInput}
              placeholder="0"
              placeholderTextColor={colors.textSecondary}
              value={customAmount}
              onChangeText={(t) => {
                setCustomAmount(t);
                const n = parseFloat(t);
                if (!isNaN(n)) setAmount(n);
              }}
              keyboardType="decimal-pad"
            />
          </View>
        )}

        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Request Payment With</Text>
          <View style={styles.separatorLine} />
        </View>
        <View style={styles.methodGrid}>
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodTile
              key={method}
              label={method}
              selected={selectedMethod === method}
              onPress={() => setSelectedMethod(method)}
            />
          ))}
        </View>

        <PrimaryButton
          title={`Request $${effectiveAmount.toFixed(2)}`}
          onPress={handleRequest}
          style={styles.requestButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  customRow: {
    marginBottom: spacing.md,
  },
  customLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  customInput: {
    ...typography.body,
    color: colors.text,
    padding: spacing.sm,
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  separatorText: {
    ...typography.body,
    color: colors.text,
    marginHorizontal: spacing.md,
  },
  methodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  requestButton: {
    backgroundColor: colors.primary,
  },
});
