import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { PrimaryButton } from '../components';
import { MOCK_JOB_POSTS } from '../data/mockJobPosts';

const CATEGORIES = ['Gardening', 'Painting', 'Landscaping', 'Cleaning', 'Plumbing', 'Other'];
const CONSUMER_ID = 'consumer-1';

export function ConsumerNewJobScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [locationText, setLocationText] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();
    const trimmedLocation = locationText.trim();
    const trimmedCategory = category.trim();

    if (!trimmedTitle) {
      Alert.alert('Error', 'Please enter a title.');
      return;
    }
    if (!trimmedDesc) {
      Alert.alert('Error', 'Please enter a description.');
      return;
    }
    if (!trimmedLocation) {
      Alert.alert('Error', 'Please enter a location.');
      return;
    }
    if (!trimmedCategory) {
      Alert.alert('Error', 'Please select a category.');
      return;
    }

    const min = budgetMin ? parseFloat(budgetMin) : undefined;
    const max = budgetMax ? parseFloat(budgetMax) : undefined;
    if (min !== undefined && (isNaN(min) || min < 0)) {
      Alert.alert('Error', 'Please enter a valid minimum budget.');
      return;
    }
    if (max !== undefined && (isNaN(max) || max < 0)) {
      Alert.alert('Error', 'Please enter a valid maximum budget.');
      return;
    }
    if (min !== undefined && max !== undefined && min > max) {
      Alert.alert('Error', 'Minimum budget cannot be greater than maximum.');
      return;
    }

    const newJob = {
      id: `jp-${Date.now()}`,
      consumerId: CONSUMER_ID,
      title: trimmedTitle,
      description: trimmedDesc,
      category: trimmedCategory,
      locationText: trimmedLocation,
      budgetMin,
      budgetMax,
      dueDate: dueDate.trim() || undefined,
      status: 'OPEN' as const,
      createdAt: new Date().toISOString(),
    };
    MOCK_JOB_POSTS.push(newJob as any);
    Alert.alert('Job posted', 'Your job has been posted. Providers can now view and respond.');
    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Lawn mowing needed"
        placeholderTextColor={colors.textSecondary}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe the work you need..."
        placeholderTextColor={colors.textSecondary}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Category *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Gardening, Painting"
        placeholderTextColor={colors.textSecondary}
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Location *</Text>
      <TextInput
        style={styles.input}
        placeholder="City or area"
        placeholderTextColor={colors.textSecondary}
        value={locationText}
        onChangeText={setLocationText}
      />

      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Budget min ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor={colors.textSecondary}
            value={budgetMin}
            onChangeText={setBudgetMin}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={styles.half}>
          <Text style={styles.label}>Budget max ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor={colors.textSecondary}
            value={budgetMax}
            onChangeText={setBudgetMax}
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      <Text style={styles.label}>Due date (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={colors.textSecondary}
        value={dueDate}
        onChangeText={setDueDate}
      />

      <PrimaryButton title="Post job" onPress={handleSubmit} style={styles.button} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
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
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: spacing.md },
  half: { flex: 1 },
  button: { marginTop: spacing.xl },
});
