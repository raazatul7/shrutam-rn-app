/**
 * Main App Component for Shrutam
 * Daily Wisdom from Ancient Texts
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import mobileAds from 'react-native-google-mobile-ads';

// Import screens
import TodayScreen from './src/screens/TodayScreen';
import PreviousQuotesScreen from './src/screens/PreviousQuotesScreen';

// Import theme and types
import { theme } from './src/styles/theme';
import { RootTabParamList } from './src/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const App: React.FC = () => {
  /**
   * Initialize Google Mobile Ads SDK
   */
  useEffect(() => {
    const initializeAds = async () => {
      try {
        await mobileAds().initialize();
        console.log('Google Mobile Ads SDK initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Google Mobile Ads SDK:', error);
      }
    };

    initializeAds();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
              let iconName: string;

              if (route.name === 'Today') {
                iconName = 'today';
              } else if (route.name === 'Previous') {
                iconName = 'history';
              } else {
                iconName = 'help'; // fallback
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.onBackground,
            tabBarStyle: {
              backgroundColor: theme.colors.surface,
              borderTopColor: theme.colors.primaryDark,
              borderTopWidth: 1,
              paddingTop: 5,
              height: 80,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
              marginBottom: 5,
            },
            headerStyle: {
              backgroundColor: theme.colors.background,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerTitleStyle: {
              color: theme.colors.onBackground,
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerTintColor: theme.colors.onBackground,
          })}
        >
          <Tab.Screen
            name="Today"
            component={TodayScreen}
            options={{
              title: "📿 Today's Wisdom",
            }}
          />
          <Tab.Screen
            name="Previous"
            component={PreviousQuotesScreen}
            options={{
              title: '📜 Recent Quotes',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;