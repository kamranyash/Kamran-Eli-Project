import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { PrimaryButton } from '../components';
import type { PaymentMethod } from '../data/mockBookings';

const PAYMENT_METHODS: PaymentMethod[] = ['Venmo', 'Zelle', 'Card', 'Cash'];

export function CreateBookingScreen() {
  const navigation = useNavigation();
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | ''>('');
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  const handleSave = () => {
    if (!clientName.trim() || !address.trim() || !date.trim() || !time.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!paymentMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }
    Alert.alert('Saved', 'Booking added (mock). In a real app this would update the list.');
    (navigation as any).goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Create Booking</Text>
      <Text style={styles.subtitle}>Add a new appointment</Text>

      <Text style={styles.label}>Client name</Text>
      <TextInput
        style={styles.input}
        placeholder="Client name"
        placeholderTextColor={colors.textSecondary}
        value={clientName}
        onChangeText={setClientName}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor={colors.textSecondary}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 2026-01-25"
        placeholderTextColor={colors.textSecondary}
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 1:00 PM - 2:00 PM"
        placeholderTextColor={colors.textSecondary}
        value={time}
        onChangeText={setTime}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        placeholderTextColor={colors.textSecondary}
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Payment method</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowPaymentDropdown(!showPaymentDropdown)}
      >
        <Text style={styles.dropdownText}>{paymentMethod || '...'}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
      {showPaymentDropdown && (
        <View style={styles.dropdownList}>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method}
              style={styles.dropdownItem}
              onPress={() => {
                setPaymentMethod(method);
                setShowPaymentDropdown(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <PrimaryButton title="Save" onPress={handleSave} style={styles.button} />
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
  label: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dropdownText: {
    ...typography.body,
    color: colors.text,
  },
  dropdownArrow: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dropdownList: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.sm,
    marginTop: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItemText: {
    ...typography.body,
    color: colors.text,
  },
  button: {
    marginTop: spacing.xl,
  },
});
