/**
 * Shareable Quote Card Component
 * Optimized for capturing and sharing as an image
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { theme } from '../styles/theme';
import { fonts } from '../styles/fonts';
import { Quote } from '../types';
import { formatDate } from '../services/api';

const { width: screenWidth } = Dimensions.get('window');

interface ShareableQuoteCardProps {
  quote: Quote;
  showDate?: boolean;
}

const ShareableQuoteCard: React.FC<ShareableQuoteCardProps> = ({ 
  quote, 
  showDate = true 
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.container}
      >
        {/* Header with App Branding */}
        <View style={styles.header}>
          <View style={styles.brandContainer}>
            <Icon name="spa" size={28} color={theme.colors.primary} />
            <Text style={styles.appName}>Shrutam</Text>
          </View>
          {showDate && (
            <Text style={styles.dateText}>{formatDate(quote.created_at)}</Text>
          )}
        </View>

        {/* Main Quote Content */}
        <View style={[styles.quoteCard, theme.shadows.card]}>
          {/* Sanskrit Shlok */}
          <View style={styles.shlokContainer}>
            <Text style={styles.shlokText}>{quote.shlok}</Text>
          </View>

          {/* Source and Category */}
          <View style={styles.metaContainer}>
            <View style={styles.sourceContainer}>
              <Icon name="book" size={18} color={theme.colors.secondary} />
              <Text style={styles.sourceText}>{quote.source}</Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{quote.category}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Hindi Meaning */}
          <View style={styles.meaningContainer}>
            <Text style={styles.meaningLabel}>🇮🇳 Hindi</Text>
            <Text style={styles.hindiText}>{quote.meaning_hindi}</Text>
          </View>

          {/* English Meaning */}
          <View style={styles.meaningContainer}>
            <Text style={styles.meaningLabel}>🌍 English</Text>
            <Text style={styles.englishText}>{quote.meaning_english}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>📿 Daily Wisdom from Ancient Texts</Text>
          <View style={styles.decorativeElements}>
            <Icon name="auto-stories" size={16} color={theme.colors.primary} />
            <Icon name="spa" size={16} color={theme.colors.secondary} />
            <Icon name="auto-stories" size={16} color={theme.colors.primary} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    minHeight: 600,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignSelf: 'center',
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appName: {
    marginLeft: theme.spacing.sm,
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontFamily: fonts.heading,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.secondary,
    fontFamily: theme.fonts.caption.fontFamily,
  },
  quoteCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.primaryDark,
  },
  shlokContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.md,
  },
  shlokText: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.sanskrit,
    textAlign: 'center',
    lineHeight: 32,
    fontFamily: fonts.sanskrit,
    includeFontPadding: false, // Android-specific fix for font rendering
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sourceText: {
    marginLeft: theme.spacing.sm,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.secondary,
    fontFamily: theme.fonts.body.fontFamily,
  },
  categoryContainer: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.onPrimary,
    textTransform: 'capitalize',
    fontFamily: theme.fonts.caption.fontFamily,
  },
  divider: {
    height: 2,
    backgroundColor: theme.colors.primaryDark,
    marginVertical: theme.spacing.md,
    opacity: 0.5,
  },
  meaningContainer: {
    marginBottom: theme.spacing.md,
  },
  meaningLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.sm,
    fontFamily: theme.fonts.body.fontFamily,
  },
  hindiText: {
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.hindi,
    fontWeight: '500',
    fontFamily: theme.fonts.body.fontFamily,
    includeFontPadding: false, // Android-specific fix for font rendering
  },
  englishText: {
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.english,
    fontWeight: '400',
    fontFamily: theme.fonts.body.fontFamily,
    includeFontPadding: false, // Android-specific fix for font rendering
  },
  footer: {
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.primary,
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    fontFamily: theme.fonts.body.fontFamily,
  },
  decorativeElements: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
});

export default ShareableQuoteCard;