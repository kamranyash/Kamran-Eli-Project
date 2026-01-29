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

export function NewChatScreen() {
  const navigation = useNavigation();
  const [phoneOrLink, setPhoneOrLink] = useState('');

  const handleCreate = () => {
    if (!phoneOrLink.trim()) {
      Alert.alert('Error', 'Enter a phone number or invite link');
      return;
    }
    Alert.alert('New chat', 'Chat created (mock). In a real app this would start a thread.');
    (navigation as any).goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>New Chat</Text>
      <Text style={styles.subtitle}>
        Enter a phone number or invite link to start a conversation
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Phone number or invite link"
        placeholderTextColor={colors.textSecondary}
        value={phoneOrLink}
        onChangeText={setPhoneOrLink}
        autoCapitalize="none"
        keyboardType="default"
      />
      <PrimaryButton title="Create chat" onPress={handleCreate} style={styles.button} />
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
    paddingTop: spacing.xl,
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
  input: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  button: {
    marginTop: spacing.sm,
  },
});
