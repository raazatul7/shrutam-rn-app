/**
 * TypeScript declarations for react-native-vector-icons
 * Ensures proper typing for icon components
 */

declare module 'react-native-vector-icons/MaterialIcons' {
  import { Component } from 'react';
  import { TextProps } from 'react-native';

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export default class Icon extends Component<IconProps> {}
}

declare module 'react-native-share' {
  export interface ShareOptions {
    title?: string;
    message?: string;
    url?: string;
    subject?: string;
    filename?: string;
  }

  export interface ShareResponse {
    success: boolean;
    data?: any;
  }

  export default class Share {
    static open(options: ShareOptions): Promise<ShareResponse>;
  }
}