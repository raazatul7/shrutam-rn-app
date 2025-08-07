/**
 * Custom Refresh Indicator Component
 * Provides a beautiful Indian-themed refresh animation
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../styles/theme';

interface RefreshIndicatorProps {
  isRefreshing: boolean;
  message?: string;
}

const RefreshIndicator: React.FC<RefreshIndicatorProps> = ({ 
  isRefreshing, 
  message = "Fetching wisdom..." 
}) => {
  const spinValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isRefreshing) {
      // Start spinning animation
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        { resetBeforeIteration: true }
      );
      spinAnimation.start();
    } else {
      // Reset animation
      spinValue.setValue(0);
    }
  }, [isRefreshing, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!isRefreshing) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, { transform: [{ rotate: spin }] }]}>
        <Icon name="spa" size={24} color={theme.colors.primary} />
      </Animated.View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.card,
  },
  iconContainer: {
    marginBottom: theme.spacing.xs,
  },
  message: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default RefreshIndicator;