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
import HomeTabs from "./src/screens/HomeTabs";
import SingleChatScreen from "./src/screens/SingleChatScreen";
import { WebSocketProvider } from "./src/socket/WebSocketProvider";
import NewChatScreen from "./src/screens/NewChatScreen";
import NewContactScreen from "./src/screens/NewContactScreen";

export type RootStack = {
  SplashScreen: undefined;

  SignUpScreen: undefined;
  ContactScreen: undefined;
  AvatarScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;

  SettingScreen: undefined;
  ProfileScreen: undefined;
  SingleChatScreen: {
    chatId: number;
    friendName: string;
    lastSeenTime: string;
    profileImage: string;
  };
 NewChatScreen:undefined;
 NewContactScreen:undefined;
};



const Stack = createNativeStackNavigator<RootStack>();
export const USER_ID=3;
export default function App() {
 
  return (
    <AlertNotificationRoot>
      <WebSocketProvider userId={USER_ID}>
      <ThemeProvider>
        <UserRegistrationProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="NewChatScreen"
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

              <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeTabs}
                options={{ headerShown: false }}
              />
               <Stack.Screen
                name="SingleChatScreen"
                component={SingleChatScreen}
                
              />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
               <Stack.Screen name="SettingScreen" component={SettingScreen} />
                <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
                <Stack.Screen name="NewContactScreen" component={NewContactScreen}/>
             
            </Stack.Navigator>
          </NavigationContainer>
        </UserRegistrationProvider>
      </ThemeProvider>
      </WebSocketProvider>
    </AlertNotificationRoot>
  );
}
