/**
 * Custom Font Configuration for Shrutam App
 * Uses beautiful Kalam fonts for authentic Indian aesthetic
 */

export const fonts = {
  // Kalam font family - perfect for Indian aesthetic
  kalam: {
    light: 'Kalam-Light',
    regular: 'Kalam-Regular', 
    bold: 'Kalam-Bold',
  },
  
  // Font family names that work on both iOS and Android
  sanskrit: 'Kalam-Regular', // For Sanskrit text
  heading: 'Kalam-Bold',      // For headings and titles
  body: 'Kalam-Regular',      // For body text
  caption: 'Kalam-Light',     // For captions and small text
  
  // System fonts as fallbacks
  system: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
};

/**
 * Font weight mapping for Kalam fonts
 */
export const fontWeights = {
  light: '300',
  regular: '400', 
  bold: '700',
};

/**
 * Get font family with fallback
 * @param fontFamily - Primary font family
 * @param fallback - Fallback font family
 * @returns Font family string with fallback
 */
export const getFontFamily = (fontFamily: string, fallback: string = 'System'): string => {
  return `${fontFamily}, ${fallback}`;
}; 