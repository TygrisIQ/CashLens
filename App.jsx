import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreens';
import BudgetScreen from './src/screens/BudgetScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { styles } from './src/ui/shared/styles';
import useTheme from './src/ui/shared/themeSelect';

const Stack = createNativeStackNavigator();

function App() {

  const { theme, themeName } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        
        
        <StatusBar
          backgroundColor={theme.card}
          barStyle={themeName === "dark" ? "light-content" : "dark-content"}
        />

        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.card,   
            },
            headerTitleStyle: {
              color: theme.text,
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerTintColor: theme.text,      
            headerShadowVisible: false,        
          }}
        >
          
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
             options={{
             headerBackVisible: false, 
            title: "CashLens",
  }}
          />

          <Stack.Screen 
            name="Budget" 
            component={BudgetScreen}
           options={{
             headerBackVisible: false, 
            title: "CashLens",
  }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
           options={{
             headerBackVisible: false, 
            title: "CashLens",
  }}
          />

          {/* <Stack.Screen 
            name="Settings"
            component={SettingsScreen}
            
          /> */}
        </Stack.Navigator>

      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
