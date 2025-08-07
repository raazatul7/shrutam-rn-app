/**
 * Today's Quote Screen - Main screen of Shrutam App
 * Displays today's Sanskrit shlok with beautiful Indian aesthetics
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

import { getTodaysQuote, formatDate, cacheQuote } from '../services/api';
import { theme } from '../styles/theme';
import { Quote, TabScreenProps } from '../types';
import ShareableQuoteCard from '../components/ShareableQuoteCard';
import BannerAdComponent from '../components/BannerAd';

type Props = TabScreenProps<'Today'>;

const TodayScreen: React.FC<Props> = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const shareViewRef = useRef<ViewShot>(null);

  /**
   * Fetches today's quote from the API
   */
  const fetchQuote = async (): Promise<void> => {
    try {
      setLoading(true);
      const todaysQuote = await getTodaysQuote();
      setQuote(todaysQuote);
      
      // Cache the quote for offline access
      await cacheQuote(todaysQuote);
    } catch (error: any) {
      console.error('Error fetching quote:', error);
      Alert.alert(
        'Connection Issue',
        'Unable to fetch today\'s quote. Please check your internet connection.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    try {
      await fetchQuote();
    } catch (error) {
      console.error('Error during refresh:', error);
      // Error is already handled in fetchQuote with alert
    } finally {
      setRefreshing(false);
    }
  };

  /**
   * Capture and share the quote as an image
   */
  const shareAsImage = async (): Promise<void> => {
    if (!quote || !shareViewRef.current) return;

    try {
      const captureMethod = shareViewRef.current?.capture;
      if (!captureMethod) {
        console.error('Capture method not available');
        // shareAsText();
        return;
      }
      
      const uri = await captureMethod();
      if (!uri) {
        console.error('Failed to capture image');
        shareAsText();
        return;
      }
      
      await Share.open({
        url: `file://${uri}`,
        title: 'Share Today\'s Wisdom',
        message: 'Daily wisdom from ancient texts - Shrutam App 📿',
      });
    } catch (error: any) {
      if (error.message !== 'User did not share') {
        console.error('Error sharing image:', error);
        // Fallback to text sharing if image fails
        // shareAsText();
      }
    }
  };

  /**
   * Share the quote as text (fallback)
   */
  const shareAsText = async (): Promise<void> => {
    if (!quote) return;

    const shareText = `📿 ${quote.shlok}

📖 ${quote.source} • ${quote.category}

🇮🇳 ${quote.meaning_hindi}

🌍 ${quote.meaning_english}

Shared from Shrutam - Daily Wisdom from Ancient Texts`;

    try {
      await Share.open({
        message: shareText,
        title: 'Share Today\'s Wisdom',
      });
    } catch (error: any) {
      if (error.message !== 'User did not share') {
        console.error('Error sharing text:', error);
      }
    }
  };

  /**
   * Show share options (Image or Text)
   */
  const showShareOptions = (): void => {
    Alert.alert(
      'Share Today\'s Wisdom',
      'How would you like to share this quote?',
      [
        {
          text: 'Share as Image 📷',
          onPress: shareAsImage,
          style: 'default',
        },
        {
          text: 'Share as Text 📝',
          onPress: shareAsText,
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (loading) {
    return (
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.container}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading today's wisdom...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (!quote) {
    return (
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.container}
      >
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={48} color={theme.colors.error} />
          <Text style={styles.errorText}>Unable to load today's quote</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchQuote}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[theme.colors.primary, theme.colors.secondary]} // Android
            tintColor={theme.colors.primary} // iOS
            title="Pull to refresh today's wisdom..." // iOS
            titleColor={theme.colors.secondary} // iOS
            progressBackgroundColor={theme.colors.surface} // Android
          />
        }
      >
        {/* Date Header */}
        <View style={styles.dateContainer}>
          <Icon name="calendar-today" size={20} color={theme.colors.primary} />
          <Text style={styles.dateText}>{formatDate(quote.created_at)}</Text>
        </View>

        {/* Main Quote Card */}
        <View style={[styles.quoteCard, theme.shadows.card]}>
          {/* Sanskrit Shlok */}
          <View style={styles.shlokContainer}>
            <Text style={styles.shlokText}>{quote.shlok}</Text>
          </View>

          {/* Source and Category */}
          <View style={styles.metaContainer}>
            <View style={styles.sourceContainer}>
              <Icon name="book" size={16} color={theme.colors.secondary} />
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

        {/* Share Button */}
        <TouchableOpacity
          style={[styles.shareButton, theme.shadows.button]}
          onPress={showShareOptions}
        >
          <Icon name="share" size={24} color={theme.colors.onPrimary} />
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Banner Ad at Bottom */}
      <BannerAdComponent />

      {/* Hidden Shareable Card for Image Capture */}
      <View style={styles.hiddenContainer}>
        <ViewShot
          ref={shareViewRef}
          options={{
            format: 'png',
            quality: 0.9,
            result: 'tmpfile',
            width: 400,
            height: 600,
          }}
        >
          {quote && <ShareableQuoteCard quote={quote} />}
        </ViewShot>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.onBackground,
    textAlign: 'center',
    fontFamily: theme.fonts.body.fontFamily,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  errorText: {
    marginTop: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.error,
    textAlign: 'center',
    fontFamily: theme.fonts.body.fontFamily,
  },
  retryButton: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  retryButtonText: {
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: theme.fonts.body.fontFamily,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.sm,
  },
  dateText: {
    marginLeft: theme.spacing.xs,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    fontFamily: theme.fonts.body.fontFamily,
  },
  quoteCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.primaryDark,
  },
  shlokContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.md,
  },
  shlokText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.sanskrit,
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: theme.fonts.sanskrit.fontFamily,
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
    marginLeft: theme.spacing.xs,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.secondary,
    fontFamily: theme.fonts.body.fontFamily,
  },
  categoryContainer: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.onPrimary,
    textTransform: 'capitalize',
    fontFamily: theme.fonts.caption.fontFamily,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.primaryDark,
    marginVertical: theme.spacing.md,
    opacity: 0.3,
  },
  meaningContainer: {
    marginBottom: theme.spacing.md,
  },
  meaningLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
    fontFamily: theme.fonts.body.fontFamily,
  },
  hindiText: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.hindi,
    fontWeight: '500',
    fontFamily: theme.fonts.body.fontFamily,
    includeFontPadding: false, // Android-specific fix for font rendering
  },
  englishText: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.english,
    fontWeight: '400',
    fontFamily: theme.fonts.body.fontFamily,
    includeFontPadding: false, // Android-specific fix for font rendering
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
  },
  shareButtonText: {
    marginLeft: theme.spacing.sm,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onPrimary,
    fontFamily: theme.fonts.heading.fontFamily,
  },
  bottomSpacing: {
    height: theme.spacing.xl,
  },
  hiddenContainer: {
    position: 'absolute',
    left: -9999,
    top: -9999,
    opacity: 0,
    width: 400,
    height: 600,
  },
});

export default TodayScreen;