/**
 * Traditional Indian Theme for Shrutam App
 * Colors inspired by Indian heritage and mythology
 */

import { Theme } from '../types';
import { fonts } from './fonts';

export const theme: Theme = {
  colors: {
    // Primary colors inspired by traditional Indian aesthetics
    primary: '#D4AF37', // Golden
    primaryDark: '#B8860B', // Dark Golden
    secondary: '#8B4513', // Saddle Brown
    accent: '#FF6347', // Tomato (for highlights)
    
    // Background colors with earthy tones
    background: '#FFF8DC', // Cornsilk - warm, light background
    surface: '#F5F5DC', // Beige - card backgrounds
    surfaceVariant: '#F0E68C', // Khaki - subtle variants
    
    // Text colors for readability
    onBackground: '#2F1B14', // Dark Brown
    onSurface: '#3E2723', // Coffee Brown
    onPrimary: '#FFFFFF',
    
    // Sanskrit and content colors
    sanskrit: '#8B0000', // Dark Red for Sanskrit text
    hindi: '#4B0000', // Darker Red for Hindi
    english: '#2F1B14', // Dark Brown for English
    
    // Additional Indian-inspired colors
    saffron: '#FF9933',
    maroon: '#800000',
    sandal: '#C19A6B',
    turmeric: '#E6BE8A',
    
    // Status colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  
  fonts: {
    // Beautiful Kalam fonts as default throughout the app
    sanskrit: {
      fontFamily: fonts.sanskrit,
      fontSize: 18,
      fontWeight: '600',
    },
    heading: {
      fontFamily: fonts.heading,
      fontSize: 24,
      fontWeight: 'bold',
    },
    body: {
      fontFamily: fonts.body,
      fontSize: 16,
      fontWeight: '400',
    },
    caption: {
      fontFamily: fonts.caption,
      fontSize: 14,
      fontWeight: '400',
    },
    // Default font for all text
    default: {
      fontFamily: fonts.body,
      fontSize: 16,
      fontWeight: '400',
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    button: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  },
};