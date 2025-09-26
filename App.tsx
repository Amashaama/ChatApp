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
import ContactScreen from "./src/screens/ContactScreen";
import AvatarScreen from "./src/screens/AvatarScreen";
import { UserRegistrationProvider } from "./src/components/UserContext";
import { AlertNotificationRoot } from "react-native-alert-notification";

export type RootStack = {
  SplashScreen: undefined;

  SignUpScreen: undefined;
  ContactScreen: undefined;
  AvatarScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;
  SettingScreen: undefined;
  ProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStack>();

export default function App() {
  return (
     <AlertNotificationRoot>
    <ThemeProvider>
     
      <UserRegistrationProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
              animation: "fade",
            }}
          >
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ContactScreen"
              component={ContactScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="AvatarScreen"
              component={AvatarScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen name="SignInScreen" component={SignInScreen}  options={{headerShown:false}}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserRegistrationProvider>
     
    </ThemeProvider>
     </AlertNotificationRoot>
  );
}
