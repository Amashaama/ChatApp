import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpScreen from "./src/screens/SignUpScreen";

import SettingScreen from "./src/screens/SettingScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import "./global.css";
import SplashScreen from "./src/screens/SplashScreen";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { ThemeProvider } from "./src/theme/ThemeProvider";

export type RootStack = {
  SplashScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  HomeScreen: undefined;
  SettingScreen: undefined;
  ProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStack>();

export default function App() {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName="SplashScreen"
       screenOptions={{
        animation:"fade",
       }}
      >
        
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
             headerShown: false

             }}
        />

        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
           options={{
             headerShown: false

             }}
          
        />

        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
}
