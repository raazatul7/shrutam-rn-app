/**
 * TypeScript declarations for environment variables
 * Provides type safety for @env imports
 */

declare module '@env' {
  export const BASE_URL: string;
  export const APP_NAME: string;
  export const APP_VERSION: string;
  export const API_TIMEOUT: string;
}