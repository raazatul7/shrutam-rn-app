/**
 * TypeScript declarations for react-native-share
 * Provides proper typing for sharing functionality
 */

declare module 'react-native-share' {
  export interface ShareOptions {
    title?: string;
    message?: string;
    url?: string;
    urls?: string[];
    subject?: string;
    filename?: string;
    excludedActivityTypes?: string[];
    failOnCancel?: boolean;
    showAppsToView?: boolean;
    saveToFiles?: boolean;
  }

  export interface ShareResponse {
    success: boolean;
    message?: string;
    error?: any;
    activityType?: string;
  }

  export default class Share {
    static open(options: ShareOptions): Promise<ShareResponse>;
    static shareSingle(options: ShareOptions & { social: string }): Promise<ShareResponse>;
  }
}