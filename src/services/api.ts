/**
 * API Service for Shrutam App
 * Handles all communication with the backend API with full TypeScript support
 */

import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { environment, debugEnvironment } from '../config/environment';
import { Quote, QuoteResponse, RecentQuotesResponse, CachedQuoteData, ApiError } from '../types';

// Debug environment variables
debugEnvironment();

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: environment.BASE_URL,
  timeout: environment.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('🌐 API Request:', config.method?.toUpperCase(), config.url);
    console.log('📍 Base URL:', environment.BASE_URL);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.message);
    console.error('🔗 URL:', error.config?.url);
    console.error('📊 Status:', error.response?.status);
    return Promise.reject(error);
  }
);

/**
 * Fetches today's quote from the API
 * @returns Promise resolving to today's quote data
 * @throws ApiError when request fails
 */
export const getTodaysQuote = async (): Promise<Quote> => {
  try {
    const response = await apiClient.get<QuoteResponse>('/quote/today');
    
    if (response.data.success) {
      // Cache the quote locally
      const cacheData: CachedQuoteData = {
        data: response.data.data,
        date: new Date().toDateString(),
      };
      
      await AsyncStorage.setItem('todaysQuote', JSON.stringify(cacheData));
      
      return response.data.data;
    } else {
      throw new ApiError(
        response.data.message || 'Failed to fetch today\'s quote',
        response.status
      );
    }
  } catch (error: any) {
    console.error('❌ Error fetching today\'s quote:', error);
    console.error('🔗 Attempted URL:', `${environment.BASE_URL}/quote/today`);
    console.error('📱 Platform: Android Emulator');
    
    // Check if it's a network connectivity issue
    if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
      console.error('🌐 Network connectivity issue detected');
      console.error('💡 Make sure your API server is running on port 3000');
      console.error('💡 For Android emulator, use 10.0.2.2 instead of localhost');
    }
    
    // Try to return cached quote if API fails
    try {
      const cached = await AsyncStorage.getItem('todaysQuote');
      if (cached) {
        const { data, date }: CachedQuoteData = JSON.parse(cached);
        if (date === new Date().toDateString()) {
          console.log('📦 Returning cached quote');
          return data;
        }
      }
    } catch (cacheError) {
      console.error('Error retrieving cached quote:', cacheError);
    }
    
    // Re-throw as ApiError
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      error.message || 'Network error occurred',
      error.response?.status
    );
  }
};

/**
 * Formats date to DD MMM YYYY format as specified in README
 * @param dateString - Date to format (string or Date object)
 * @returns Formatted date string
 */
export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  const months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
};

/**
 * Fetches recent quotes from the API
 * @returns Promise resolving to array of recent quotes
 */
export const getRecentQuotes = async (): Promise<Quote[]> => {
  try {
    const response = await apiClient.get<RecentQuotesResponse>('/quote/recent');
    
    if (response.data.success) {
      // Cache the quotes locally for offline access
      await cacheQuotes(response.data.data.quotes);
      return response.data.data.quotes;
    } else {
      throw new ApiError(
        response.data.message || 'Failed to fetch recent quotes',
        response.status
      );
    }
  } catch (error: any) {
    console.error('Error fetching recent quotes:', error);
    
    // Try to return cached quotes if API fails
    try {
      const cached = await getCachedQuotes();
      if (cached.length > 0) {
        return cached;
      }
    } catch (cacheError) {
      console.error('Error retrieving cached quotes:', cacheError);
    }
    
    // Re-throw as ApiError
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      error.message || 'Network error occurred',
      error.response?.status
    );
  }
};

/**
 * Gets cached quotes for offline viewing
 * @returns Promise resolving to array of cached quotes
 */
export const getCachedQuotes = async (): Promise<Quote[]> => {
  try {
    const cached = await AsyncStorage.getItem('cachedQuotes');
    return cached ? JSON.parse(cached) as Quote[] : [];
  } catch (error) {
    console.error('Error getting cached quotes:', error);
    return [];
  }
};

/**
 * Saves a quote to local cache
 * @param quote - Quote to cache
 */
export const cacheQuote = async (quote: Quote): Promise<void> => {
  try {
    const cached = await getCachedQuotes();
    const updated = [quote, ...cached.filter(q => q.id !== quote.id)];
    // Keep only last 30 quotes to manage storage
    const limited = updated.slice(0, 30);
    await AsyncStorage.setItem('cachedQuotes', JSON.stringify(limited));
  } catch (error) {
    console.error('Error caching quote:', error);
  }
};

/**
 * Saves multiple quotes to local cache
 * @param quotes - Array of quotes to cache
 */
export const cacheQuotes = async (quotes: Quote[]): Promise<void> => {
  try {
    const cached = await getCachedQuotes();
    const updated = [...quotes, ...cached.filter(q => !quotes.some(newQ => newQ.id === q.id))];
    // Keep only last 30 quotes to manage storage
    const limited = updated.slice(0, 30);
    await AsyncStorage.setItem('cachedQuotes', JSON.stringify(limited));
  } catch (error) {
    console.error('Error caching quotes:', error);
  }
};