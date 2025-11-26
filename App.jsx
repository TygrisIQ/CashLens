/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreens';
import BudgetScreen from './src/screens/BudgetScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { styles } from './src/ui/shared/styles';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            style
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'CashLens',
              headerTitleStyle: styles.title,
            }}
          />
          <Stack.Screen 
            name="Budget" 
            component={BudgetScreen}
            options={{
              title: 'CashLens',
              headerTitleStyle: styles.title
            }}
          />
          <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "CashLens",
            headerTitleStyle: styles.title
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}



export default App;
