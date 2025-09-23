import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

import "../../global.css";
import CircleShape from "../components/CircleShape";
import { useEffect, useRef } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { runOnJS } from "react-native-worklets";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;

export default function SplashScreen() {
  const navigation = useNavigation<Props>();

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 3000 });
    const timer = setTimeout(() => {
      navigation.navigate("SignUpScreen");
    }, 3000);

    return()=>{
      clearTimeout(timer);
    };
  }, [navigation,opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const {applied}=useTheme();

  const logo= applied === "light"?require("../../assets/logo.png") :require("../../assets/lightLogo.png");

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-slate-50">
      <StatusBar hidden />

      <CircleShape
        width={200}
        height={200}
        className="bg-slate-900"
        borderRadius={999}
        topValue={-25}
        leftValue={-50}
      />
      <CircleShape
        width={150}
        height={150}
        className="bg-sky-950"
        borderRadius={999}
        topValue={-30}
        leftValue={60}
      />

      <Animated.View style={animatedStyle}>
        <Image
          source={logo}
          style={{ height: 180, width: 220 }}
        />
      </Animated.View>

      <Animated.View className="absolute bottom-20" style={animatedStyle}>
        <View className="justify-center items-center">
          <Text className="text-xs font-bold text-slate-600">
            POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
          </Text>
          <Text className="text-xs font-bold text-slate-600">
            VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  companyName: {
    color: "#6B7280",
    fontWeight: "bold",
    fontSize: 12,
  },
  appVersion: {
    color: "#6B7280",
    fontWeight: "bold",
    fontSize: 10,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 220,
    height: 180,
  },
});
