import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { PrimaryButton } from '../components';
import { MOCK_PROVIDERS } from '../data/mockProviders';
import { MOCK_APPOINTMENT_REQUESTS } from '../data/mockAppointmentRequests';

type ConsumerRequestAppointmentParams = {
  ConsumerRequestAppointment: { providerId: string };
};

export function ConsumerRequestAppointmentScreen() {
  const route = useRoute<RouteProp<ConsumerRequestAppointmentParams, 'ConsumerRequestAppointment'>>();
  const navigation = useNavigation();
  const providerId = route.params?.providerId ?? '';
  const provider = MOCK_PROVIDERS.find((p) => p.id === providerId);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (!provider) return;
    if (!date.trim()) {
      Alert.alert('Error', 'Please enter a date.');
      return;
    }
    if (!time.trim()) {
      Alert.alert('Error', 'Please enter a time.');
      return;
    }
    const dur = parseInt(duration, 10);
    if (isNaN(dur) || dur < 15 || dur > 480) {
      Alert.alert('Error', 'Please enter a duration between 15 and 480 minutes.');
      return;
    }
    const startTime = `${date}T${time}:00`;
    const start = new Date(startTime);
    const end = new Date(start.getTime() + dur * 60 * 1000);
    const endTime = end.toISOString().slice(0, 19);

    const newRequest = {
      id: `ar-${Date.now()}`,
      consumerId: 'consumer-1',
      providerId: provider.id,
      startTime,
      endTime,
      note: note.trim(),
      status: 'PENDING' as const,
      providerName: provider.businessName,
      createdAt: new Date().toISOString(),
    };
    MOCK_APPOINTMENT_REQUESTS.push(newRequest);
    Alert.alert('Request sent', 'Your appointment request has been sent to the provider.');
    navigation.goBack();
  };

  if (!provider) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Provider not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.providerName}>Request appointment with {provider.businessName}</Text>

      <Text style={styles.label}>Date *</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={colors.textSecondary}
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Time *</Text>
      <TextInput
        style={styles.input}
        placeholder="14:00"
        placeholderTextColor={colors.textSecondary}
        value={time}
        onChangeText={setTime}
      />

      <Text style={styles.label}>Duration (minutes) *</Text>
      <TextInput
        style={styles.input}
        placeholder="60"
        placeholderTextColor={colors.textSecondary}
        value={duration}
        onChangeText={setDuration}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Note (optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Any details for the provider..."
        placeholderTextColor={colors.textSecondary}
        value={note}
        onChangeText={setNote}
        multiline
      />

      <PrimaryButton title="Send request" onPress={handleSubmit} style={styles.button} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  providerName: { ...typography.h3, color: colors.text, marginBottom: spacing.lg },
  label: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
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
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  button: { marginTop: spacing.xl },
  errorText: { ...typography.body, color: colors.error, padding: spacing.lg },
});
