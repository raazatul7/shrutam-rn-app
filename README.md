# 📿 Shrutam – Daily Wisdom from Ancient Texts

Shrutam is a feel-good, shareable daily quotes app built with **React Native** and **TypeScript**. It delivers one powerful Sanskrit shlok every day—along with its meaning and source—creating a moment of reflection rooted in Indian mythology and philosophy.

## 🛠️ Tech Stack

- **React Native** 0.80.2 - Cross-platform mobile development
- **TypeScript** 5.0.4 - Type-safe JavaScript
- **React Navigation** - Navigation system
- **Axios** - HTTP client for API calls
- **AsyncStorage** - Local data persistence
- **React Native Vector Icons** - Beautiful icons
- **React Native Linear Gradient** - Gradient backgrounds
- **React Native Share** - Social sharing functionality

### 🧘 Purpose

The goal is simple: offer users a mindful start to their day through handpicked quotes from sacred texts like the Bhagavad Gita, categorized and designed for daily engagement.

### 🪔 Features

- 📜 **Daily Quote View**
  - Shows today's shlok with:
    - Original Sanskrit shlok
    - Source (e.g., Bhagavad Gita)
    - Category (e.g., karma, dharma)
    - Meaning in Hindi
    - Meaning in English
    - Date displayed in `DD MMM YYYY` format

- 🕰 **Previous Quotes**
  - Users can view earlier quotes from a calendar-style or scrollable list.
  - No future dates or repeated entries.

- 📤 **Smart Sharing**
  - Share quotes as **beautiful images** with the same UI design
  - Alternative text sharing for compatibility
  - Choose between image 📷 or text 📝 sharing options

### 🎨 UI & Design

- Ethnic, mythical theme with traditional Indian aesthetics
- Soft backgrounds with earthy tones (beige, sandal, maroon)
- **Beautiful Kalam fonts** for authentic Indian typography
- Clean, focused layout with emphasis on content

---

## 🚀 Development Setup

### Prerequisites

- Node.js >= 18
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS, macOS only)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd shrutam

# Install dependencies
npm install

# iOS additional setup (macOS only)
cd ios && pod install && cd ..
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios
```

### TypeScript Development

This project is fully written in **TypeScript** for enhanced developer experience and type safety.

#### Key TypeScript Features:
- **Strict Type Checking** - All files use strict TypeScript configuration
- **Type-Safe API Calls** - All API responses are properly typed
- **Interface Definitions** - Comprehensive interfaces for quotes, navigation, and theme
- **Error Handling** - Custom typed error classes for better debugging

#### Type Definitions Location:
- `src/types/index.ts` - Main type definitions
- `src/styles/theme.ts` - Theme and styling types
- `src/services/api.ts` - API service types

#### Development Commands:
```bash
# Type checking
npx tsc --noEmit

# Linting with TypeScript
npm run lint

# Testing
npm test
```

---

## 🔗 API Integration

This app uses a custom backend hosted on Render and Supabase for data storage.

### 🔥 Endpoints Used

#### ✅ Today's Quote

**Endpoint**  
`GET https://shrutam-backend.onrender.com/api/quote/today`

**Response**
```json
{
  "success": true,
  "data": {
    "id": "5c3372a8-6ff1-455b-8eb1-ffaa7015ccd1",
    "shlok": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    "source": "Bhagavad Gita",
    "category": "karma",
    "created_at": "2025-08-06T15:47:14.612823+00:00",
    "meaning_hindi": "तुम्हारा अधिकार केवल कर्म करने में है, फल में नहीं।",
    "meaning_english": "You have the right to perform your actions, but never to the fruits of those actions."
  },
  "message": "Today's quote retrieved successfully"
}
```

---

## 📱 App Structure

```
shrutam/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Main app screens
│   │   ├── TodayScreen.tsx     # Today's quote display
│   │   └── PreviousQuotesScreen.tsx  # Historical quotes
│   ├── services/           # API and data services
│   │   └── api.ts             # API client with TypeScript
│   ├── styles/             # Theme and styling
│   │   └── theme.ts           # App theme configuration
│   ├── types/              # TypeScript definitions
│   │   └── index.ts           # Main type exports
│   └── utils/              # Utility functions
├── App.tsx                 # Main app component
└── index.js               # App entry point
```

## 🎯 Features Implemented

- ✅ TypeScript integration with strict type checking
- ✅ Beautiful Indian-themed UI with traditional aesthetics
- ✅ **Authentic Kalam fonts** for Sanskrit and Indian typography
- ✅ Daily quote fetching with offline caching
- ✅ Previous quotes browsing with local storage
- ✅ Social sharing functionality
- ✅ **Enhanced Pull-to-Refresh** with vibration feedback and themed indicators  
- ✅ **Image Sharing** - Share quotes as beautiful, branded images with the same UI
- ✅ **Dual Sharing Options** - Choose between image and text sharing
- ✅ Error handling and loading states with graceful fallbacks
- ✅ Responsive design for various screen sizes
- ✅ Environment variable configuration (.env support)
- ✅ Offline-first architecture with data caching

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Built with 🧡 for spiritual wisdom and daily reflection**