import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { PrimaryButton } from '../components';

interface SignUpBusinessScreenProps {
  onSignUpSuccess: () => void;
  onBack: () => void;
}

export function SignUpBusinessScreen({ onSignUpSuccess, onBack }: SignUpBusinessScreenProps) {
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  const handleSignUp = () => {
    if (!businessName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in business name, email, and password');
      return;
    }
    onSignUpSuccess();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Business account</Text>
        <Text style={styles.subtitle}>Create your business profile</Text>

        <View style={styles.photoRow}>
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoPlaceholderText}>Add photo</Text>
          </View>
          <Text style={styles.photoHint}>Logo or profile photo (optional)</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Business name *"
          placeholderTextColor={colors.textSecondary}
          value={businessName}
          onChangeText={setBusinessName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor={colors.textSecondary}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email *"
          placeholderTextColor={colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Password *"
          placeholderTextColor={colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />
        <TextInput
          style={styles.input}
          placeholder="Location / service area"
          placeholderTextColor={colors.textSecondary}
          value={location}
          onChangeText={setLocation}
          autoCapitalize="words"
        />

        <PrimaryButton title="Create business account" onPress={handleSignUp} style={styles.button} />

        <TouchableOpacity onPress={onBack} style={styles.backWrap}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: spacing.xl,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  photoPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.md,
  },
  photoPlaceholderText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  photoHint: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  backWrap: {
    alignSelf: 'center',
  },
  backLink: {
    ...typography.link,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
