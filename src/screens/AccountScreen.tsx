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
import { colors, spacing, borderRadius, typography } from '../theme';
import { PrimaryButton } from '../components';

export function AccountScreen() {
  const [skills, setSkills] = useState<string[]>(['Gardening', 'Lawn mowing', 'Landscaping']);
  const [newSkill, setNewSkill] = useState('');
  const [photos, setPhotos] = useState<{ id: string; label?: string }[]>([
    { id: '1', label: 'Garden project' },
    { id: '2', label: 'Lawn care' },
  ]);

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) {
      Alert.alert('Already added', 'This skill is already in your list.');
      return;
    }
    setSkills((prev) => [...prev, trimmed]);
    setNewSkill('');
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleAddPhoto = () => {
    Alert.alert(
      'Add photo',
      'In a full app you could choose from camera or gallery, or paste an image. For now a placeholder is added.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add placeholder',
          onPress: () => {
            setPhotos((prev) => [
              ...prev,
              { id: String(Date.now()), label: `Work photo ${prev.length + 1}` },
            ]);
          },
        },
      ]
    );
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Account</Text>
      <Text style={styles.subtitle}>Update your profile so clients can find and hire you</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Your skills</Text>
        <Text style={styles.hint}>Add skills like painting, gardening, or lawn care.</Text>
        <View style={styles.skillRow}>
          <TextInput
            style={styles.input}
            placeholder="e.g. Painting, Plumbing"
            placeholderTextColor={colors.textSecondary}
            value={newSkill}
            onChangeText={setNewSkill}
            onSubmitEditing={handleAddSkill}
          />
          <TouchableOpacity
            onPress={handleAddSkill}
            style={styles.addSkillButton}
          >
            <Text style={styles.addSkillText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.skillTags}>
          {skills.map((skill) => (
            <View key={skill} style={styles.skillTag}>
              <Text style={styles.skillTagText}>{skill}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveSkill(skill)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={styles.skillTagRemove}
              >
                <Text style={styles.skillTagRemoveText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Photos of previous work</Text>
        <Text style={styles.hint}>Show clients your best projects. Add photos from past jobs.</Text>
        <TouchableOpacity
          onPress={handleAddPhoto}
          style={styles.addPhotoButton}
        >
          <Text style={styles.addPhotoIcon}>+</Text>
          <Text style={styles.addPhotoText}>Add photo</Text>
        </TouchableOpacity>
        <View style={styles.photoGrid}>
          {photos.map((photo) => (
            <View key={photo.id} style={styles.photoCard}>
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>📷</Text>
                <Text style={styles.photoLabel} numberOfLines={1}>
                  {photo.label ?? 'Previous work'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleRemovePhoto(photo.id)}
                style={styles.photoRemove}
              >
                <Text style={styles.photoRemoveText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <PrimaryButton
        title="Save changes"
        onPress={() => Alert.alert('Saved', 'Your profile has been updated (mock).')}
        style={styles.saveButton}
      />
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
    ...typography.title,
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
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  hint: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  skillRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addSkillButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
  },
  addSkillText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.white,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  skillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    paddingVertical: spacing.xs,
    paddingLeft: spacing.sm,
    paddingRight: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  skillTagText: {
    ...typography.bodySmall,
    color: colors.text,
    marginRight: spacing.xs,
  },
  skillTagRemove: {
    padding: 2,
  },
  skillTagRemoveText: {
    fontSize: 18,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
  },
  addPhotoIcon: {
    fontSize: 24,
    color: colors.primary,
    marginRight: spacing.sm,
  },
  addPhotoText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.primary,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  photoCard: {
    width: '47%',
    position: 'relative',
  },
  photoPlaceholder: {
    aspectRatio: 1,
    backgroundColor: colors.gray[200],
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  photoPlaceholderText: {
    fontSize: 40,
    marginBottom: spacing.xs,
  },
  photoLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    paddingHorizontal: spacing.xs,
  },
  photoRemove: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoRemoveText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 20,
  },
  saveButton: {
    marginTop: spacing.sm,
  },
});
