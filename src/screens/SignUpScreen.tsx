import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { useTheme } from "../theme/ThemeProvider";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";

type SignUpProps = NativeStackNavigationProp<RootStack,"SignUpScreen">;

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpProps>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { applied } = useTheme();

  const logo =
    applied === "light"
      ? require("../../assets/logo.png")
      : require("../../assets/lightLogo.png");

  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
        className="flex-1 justify-center items-center"
      >
        <SafeAreaView className="justify-center items-center p-5">
          <StatusBar />
          <Image source={logo} className="h-40 w-36" />
          <View className="w-full justify-start items-start">
            <Text className="font-bold text-slate-500 ">
              Create your account and start the conversation today
            </Text>
          </View>

          <View className="self-stretch">
            <View className="w-full my-3">
              <FloatingLabelInput
                style={{ borderWidth: 2, borderColor: "black" }}
                label={"Enter your first name"}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View className="w-full my-3">
              <FloatingLabelInput
                style={{ borderWidth: 2, borderColor: "black" }}
                label={"Enter your last name"}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>
        </SafeAreaView>
        <View className="mt-1 w-full px-5">
          <Pressable className="bg-green-600 h-14 justify-center items-center rounded-full"
          onPress={()=>{
            navigation.replace("ContactScreen");
          }}
          >
            <Text className="text-slate-100  font-bold text-2xl">
              Next
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
  );
}
