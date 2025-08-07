/**
 * TypeScript type definitions for Shrutam App
 * Defines the structure of quotes, API responses, and navigation
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

/**
 * Quote data structure from API
 */
export interface Quote {
  id: string;
  shlok: string;
  source: string;
  category: string;
  created_at: string;
  meaning_hindi: string;
  meaning_english: string;
}

/**
 * API response structure for quotes
 */
export interface QuoteResponse {
  success: boolean;
  data: Quote;
  message: string;
}

/**
 * Recent quotes API response structure
 */
export interface RecentQuotesResponse {
  success: boolean;
  data: {
    quotes: Quote[];
    count: number;
  };
  message: string;
}

/**
 * Cached quote data with local metadata
 */
export interface CachedQuoteData {
  data: Quote;
  date: string;
}

/**
 * Navigation parameter list for tab navigator
 */
export type RootTabParamList = {
  Today: undefined;
  Previous: undefined;
};

/**
 * Props type for tab screen components
 */
export type TabScreenProps<T extends keyof RootTabParamList> = BottomTabScreenProps<
  RootTabParamList,
  T
>;

/**
 * Theme colors interface
 */
export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceVariant: string;
  onBackground: string;
  onSurface: string;
  onPrimary: string;
  sanskrit: string;
  hindi: string;
  english: string;
  saffron: string;
  maroon: string;
  sandal: string;
  turmeric: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

/**
 * Font configuration interface
 */
export interface FontConfig {
  fontFamily: string;
  fontSize: number;
  fontWeight: string | number;
}

export interface ThemeFonts {
  sanskrit: FontConfig;
  heading: FontConfig;
  body: FontConfig;
  caption: FontConfig;
  default: FontConfig;
}

/**
 * Theme interface
 */
export interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  shadows: {
    card: ShadowStyle;
    button: ShadowStyle;
  };
}

/**
 * Shadow style interface
 */
export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

/**
 * API service error type
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}