/**
 * TypeScript declarations for react-native-view-shot
 * Provides type safety for screenshot capturing
 */

declare module 'react-native-view-shot' {
  import { Component, RefObject } from 'react';
  import { ViewProps } from 'react-native';

  export interface CaptureOptions {
    format?: 'jpg' | 'png' | 'webm' | 'raw';
    quality?: number;
    width?: number;
    height?: number;
    result?: 'tmpfile' | 'base64' | 'data-uri' | 'zip-base64';
    snapshotContentContainer?: boolean;
  }

  export interface ViewShotProps extends ViewProps {
    options?: CaptureOptions;
  }

  export default class ViewShot extends Component<ViewShotProps> {
    capture(): Promise<string>;
  }

  export function captureRef<T>(
    ref: RefObject<T>,
    options?: CaptureOptions
  ): Promise<string>;

  export function captureScreen(options?: CaptureOptions): Promise<string>;
}