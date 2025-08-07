/**
 * Previous Quotes Screen - Browse historical quotes
 * Shows cached quotes with beautiful Indian aesthetics
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  ListRenderItem,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

import { getRecentQuotes, formatDate } from '../services/api';
import { theme } from '../styles/theme';
import { Quote, TabScreenProps } from '../types';
import ShareableQuoteCard from '../components/ShareableQuoteCard';

type Props = TabScreenProps<'Previous'>;

const PreviousQuotesScreen: React.FC<Props> = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const shareViewRef = useRef<ViewShot>(null);

  /**
   * Load recent quotes from API
   */
  const loadQuotes = async (): Promise<void> => {
    try {
      setLoading(true);
      const recentQuotes = await getRecentQuotes();
      // Sort by date (newest first)
      const sortedQuotes = recentQuotes.sort(
        (a: Quote, b: Quote) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setQuotes(sortedQuotes);
    } catch (error) {
      console.error('Error loading quotes:', error);
      Alert.alert(
        'Error',
        'Unable to load recent quotes.',
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
      await loadQuotes();
    } catch (error) {
      console.error('Error during refresh:', error);
      // Error is already handled in loadQuotes with alert
    } finally {
      setRefreshing(false);
    }
  };

  /**
   * Capture and share a quote as an image
   */
  const shareQuoteAsImage = async (quote: Quote): Promise<void> => {
    if (!shareViewRef.current) return;

    // Set the selected quote for capture
    setSelectedQuote(quote);

    // Wait for component to update with new quote
    setTimeout(async () => {
      try {
        if (!shareViewRef.current) {
          shareQuoteAsText(quote);
          return;
        }
        
        const captureMethod = shareViewRef.current?.capture;
        if (!captureMethod) {
          console.error('Capture method not available');
          shareQuoteAsText(quote);
          return;
        }
        
        const uri = await captureMethod();
        if (!uri) {
          console.error('Failed to capture image');
          shareQuoteAsText(quote);
          return;
        }
        
        await Share.open({
          url: `file://${uri}`,
          title: 'Share Ancient Wisdom',
          message: 'Daily wisdom from ancient texts - Shrutam App 📿',
        });
      } catch (error: any) {
        if (error.message !== 'User did not share') {
          console.error('Error sharing image:', error);
          // Fallback to text sharing if image fails
          shareQuoteAsText(quote);
        }
      } finally {
        setSelectedQuote(null);
      }
    }, 100);
  };

  /**
   * Share a specific quote as text
   */
  const shareQuoteAsText = async (quote: Quote): Promise<void> => {
    const shareText = `📿 ${quote.shlok}

📖 ${quote.source} • ${quote.category}
📅 ${formatDate(quote.created_at)}

🇮🇳 ${quote.meaning_hindi}

🌍 ${quote.meaning_english}

Shared from Shrutam - Daily Wisdom from Ancient Texts`;

    try {
      await Share.open({
        message: shareText,
        title: 'Share Ancient Wisdom',
      });
    } catch (error: any) {
      if (error.message !== 'User did not share') {
        console.error('Error sharing text:', error);
      }
    }
  };

  /**
   * Show share options for a specific quote
   */
  const showShareOptions = (quote: Quote): void => {
    Alert.alert(
      'Share Ancient Wisdom',
      'How would you like to share this quote?',
      [
        {
          text: 'Share as Image 📷',
          onPress: () => shareQuoteAsImage(quote),
          style: 'default',
        },
        {
          text: 'Share as Text 📝',
          onPress: () => shareQuoteAsText(quote),
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

  /**
   * Render individual quote item
   */
  const renderQuoteItem: ListRenderItem<Quote> = ({ item, index }) => (
    <View style={[styles.quoteCard, theme.shadows.card]}>
      {/* Date and Share Row */}
      <View style={styles.headerRow}>
        <View style={styles.dateContainer}>
          <Icon name="calendar-today" size={14} color={theme.colors.primary} />
          <Text style={styles.dateText}>{formatDate(item.created_at)}</Text>
        </View>
        <TouchableOpacity
          style={styles.miniShareButton}
          onPress={() => showShareOptions(item)}
        >
          <Icon name="share" size={16} color={theme.colors.secondary} />
        </TouchableOpacity>
      </View>

      {/* Sanskrit Shlok */}
      <View style={styles.shlokContainer}>
        <Text style={styles.shlokText} numberOfLines={2}>
          {item.shlok}
        </Text>
      </View>

      {/* Source and Category */}
      <View style={styles.metaRow}>
        <View style={styles.sourceContainer}>
          <Icon name="book" size={14} color={theme.colors.secondary} />
          <Text style={styles.sourceText}>{item.source}</Text>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>

      {/* Meanings (Collapsed) */}
      <View style={styles.meaningsContainer}>
        <Text style={styles.hindiPreview} numberOfLines={1}>
          🇮🇳 {item.meaning_hindi}
        </Text>
        <Text style={styles.englishPreview} numberOfLines={2}>
          🌍 {item.meaning_english}
        </Text>
      </View>
    </View>
  );

  /**
   * Empty state component
   */
  const EmptyState: React.FC = () => (
    <View style={styles.emptyContainer}>
      <Icon name="history" size={64} color={theme.colors.primary} />
      <Text style={styles.emptyTitle}>No Recent Quotes</Text>
      <Text style={styles.emptySubtitle}>
        Recent quotes will appear here when available
      </Text>
    </View>
  );

  useEffect(() => {
    loadQuotes();
  }, []);

  if (loading) {
    return (
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.container}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading recent quotes...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      {/* Header Stats */}
      {quotes.length > 0 && (
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="auto-stories" size={20} color={theme.colors.primary} />
            <Text style={styles.statText}>{quotes.length} Recent Quotes</Text>
          </View>
        </View>
      )}

      {/* Quotes List */}
      <FlatList<Quote>
        data={quotes}
        keyExtractor={(item) => item.id}
        renderItem={renderQuoteItem}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[theme.colors.primary, theme.colors.secondary]} // Android
            tintColor={theme.colors.primary} // iOS
            title="Pull to refresh recent quotes..." // iOS
            titleColor={theme.colors.secondary} // iOS
            progressBackgroundColor={theme.colors.surface} // Android
          />
        }
        ListEmptyComponent={EmptyState}
        contentContainerStyle={
          quotes.length === 0 ? styles.emptyList : styles.list
        }
        showsVerticalScrollIndicator={false}
      />

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
          {selectedQuote && <ShareableQuoteCard quote={selectedQuote} />}
        </ViewShot>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  statsContainer: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  statText: {
    marginLeft: theme.spacing.xs,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.onBackground,
    fontFamily: theme.fonts.body.fontFamily,
  },
  list: {
    padding: theme.spacing.md,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
    marginTop: theme.spacing.md,
    textAlign: 'center',
    fontFamily: theme.fonts.heading.fontFamily,
  },
  emptySubtitle: {
    fontSize: 16,
    color: theme.colors.secondary,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: theme.fonts.body.fontFamily,
  },
  quoteCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primaryDark,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: theme.spacing.xs,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
    fontFamily: theme.fonts.caption.fontFamily,
  },
  miniShareButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surfaceVariant,
  },
  shlokContainer: {
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  shlokText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.sanskrit,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: theme.fonts.sanskrit.fontFamily,
    includeFontPadding: false, // Android-specific fix for font rendering
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sourceText: {
    marginLeft: theme.spacing.xs,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.secondary,
    fontFamily: theme.fonts.caption.fontFamily,
  },
  categoryBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.onPrimary,
    textTransform: 'capitalize',
    fontFamily: theme.fonts.caption.fontFamily,
  },
  meaningsContainer: {
    marginTop: theme.spacing.xs,
  },
  hindiPreview: {
    fontSize: 13,
    color: theme.colors.hindi,
    marginBottom: theme.spacing.xs,
    fontFamily: theme.fonts.caption.fontFamily,
    includeFontPadding: false, // Android-specific fix for font rendering
  },
  englishPreview: {
    fontSize: 13,
    color: theme.colors.english,
    lineHeight: 18,
    fontFamily: theme.fonts.caption.fontFamily,
    includeFontPadding: false, // Android-specific fix for font rendering
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

export default PreviousQuotesScreen;