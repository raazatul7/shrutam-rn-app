/**
 * Banner Ad Component
 * Displays Google Mobile Ads banner at the bottom of the screen
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import { getBannerAdUnitId } from '../config/ads';
import { theme } from '../styles/theme';

interface BannerAdProps {
  /**
   * Optional custom ad unit ID
   * If not provided, uses the configured ad unit ID
   */
  adUnitId?: string;
  
  /**
   * Optional custom banner size
   * Defaults to BANNER
   */
  size?: BannerAdSize;
  
  /**
   * Optional custom styles
   */
  style?: any;
}

const BannerAdComponent: React.FC<BannerAdProps> = ({ 
  adUnitId, 
  size = BannerAdSize.BANNER,
  style 
}) => {
  const [adLoaded, setAdLoaded] = useState<boolean>(false);
  const [adError, setAdError] = useState<string | null>(null);

  // Use provided ad unit ID or get from config
  const unitId = adUnitId || getBannerAdUnitId();

  /**
   * Handle ad load success
   */
  const onAdLoaded = (): void => {
    console.log('Banner ad loaded successfully');
    setAdLoaded(true);
    setAdError(null);
  };

  /**
   * Handle ad load error
   */
  const onAdFailedToLoad = (error: any): void => {
    console.error('Banner ad failed to load:', error);
    setAdError(error.message || 'Ad failed to load');
    setAdLoaded(false);
  };

  /**
   * Handle ad opened
   */
  const onAdOpened = (): void => {
    console.log('Banner ad opened');
  };

  /**
   * Handle ad closed
   */
  const onAdClosed = (): void => {
    console.log('Banner ad closed');
  };

  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={unitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={onAdLoaded}
        onAdFailedToLoad={onAdFailedToLoad}
        onAdOpened={onAdOpened}
        onAdClosed={onAdClosed}
      />
      
      {/* Debug info in development */}
      {__DEV__ && (
        <View style={styles.debugInfo}>
          <View style={styles.debugItem}>
            <View style={[styles.statusIndicator, { backgroundColor: adLoaded ? theme.colors.success : theme.colors.error }]} />
            <View style={styles.debugText}>
              <View style={styles.debugLabel}>Status:</View>
              <View style={styles.debugValue}>
                {adLoaded ? 'Loaded' : adError ? 'Error' : 'Loading...'}
              </View>
            </View>
          </View>
          {adError && (
            <View style={styles.debugItem}>
              <View style={styles.debugText}>
                <View style={styles.debugLabel}>Error:</View>
                <View style={styles.debugValue}>{adError}</View>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.primaryDark,
    paddingVertical: theme.spacing.xs,
  },
  debugInfo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: theme.spacing.xs,
    zIndex: 1000,
  },
  debugItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  debugText: {
    flex: 1,
    flexDirection: 'row',
  },
  debugLabel: {
    fontSize: 10,
    color: theme.colors.onSurface,
    fontWeight: 'bold',
    marginRight: theme.spacing.xs,
  },
  debugValue: {
    fontSize: 10,
    color: theme.colors.onSurface,
    flex: 1,
  },
});

export default BannerAdComponent;
