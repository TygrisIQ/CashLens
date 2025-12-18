import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreens';
import BudgetScreen from '../screens/BudgetScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProfileScreen from '../screens/ProfileScreen';
import useTheme from '../shared/themeSelect';
import InsightsScreen from '../screens/InsightScreen';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.subtitle,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.subtitle,
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === 'Home') icon = 'home-outline';
          if (route.name === 'Budget') icon = 'wallet-outline';
          { /*if (route.name === 'Calendar') icon = 'calendar-outline'; */}
          if (route.name === 'Profile') icon = 'person-outline';
          if (route.name === 'Insights') icon = 'stats-chart-outline';
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
      {/*<Tab.Screen name="Calendar" component={CalendarScreen} /> */}
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} /> 
      
    </Tab.Navigator>
  );
}
