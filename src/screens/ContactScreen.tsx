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
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { validateCountryCode, validatePhoneNo } from "../util/validation";

type ContactProp = NativeStackNavigationProp<RootStack, "ContactScreen">;

export default function ContactScreen() {
  const navigation = useNavigation<ContactProp>();

  const [countryCode, setCountryCode] = useState<CountryCode>("LK");
  const [country, setCountry] = useState<Country | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const {userData,setUserData} = useUserRegistration();

  const [callingCode,setCallingCode] = useState("+94");
  const [phoneNo,setPhoneNo] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      
      <StatusBar hidden={false} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
       
      >
        <View className="p-5 items-center">
          <Image
            source={require("../../assets/logo.png")}
            className="h-40 w-36"
          />

          <Text className="text-slate-600 font-bold mt-4 text-center">
            We use your contacts to help find friends who are already on the
            app. Your contacts stay private.
          </Text>

          <View className="mt-5 w-full">
            <View  className="border-b-2 border-b-green-600 justify-center items-center flex-row h-14 my-3 mb-3">
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCountryNameButton
                withCallingCode
                visible={show}
                onClose={() => {
                  setShow(false);
                }}
                onSelect={(c) => {
                  setCountryCode(c.cca2);
                  setCountry(c);
                  setShow(false);
                 
                }}
              />
               <AntDesign
                name="caret-down"
                size={20}
                color="black"
                style={{ marginTop: 5 }}
              />
            </View>

            <View className="mt-2 flex flex-row justify-center">
              <TextInput
                inputMode="tel"
                className="h-16 font-bold text-lg border-y-2 border-y-green-600 w-[18%]"
                placeholder="+94"
                editable={false}
                value={country? `+${country.callingCode}`:callingCode}
                 onChangeText={(text)=>{
                  setCallingCode(text);
                 }}
               
              />

              <TextInput
                inputMode="tel"
                className="h-16 font-bold text-lg border-y-2 border-y-green-600 w-[80%] ml-2"
                placeholder="## ### ####"
                value={phoneNo}
                onChangeText={(text)=>{
                  setPhoneNo(text);
                }}
              />
            </View>
          </View>

          <View className="mt-20 w-full">
            <Pressable
              className="justify-center items-center bg-green-600 w-fully h-14 rounded-full"
              onPress={() => {

                const validCountryCode =validateCountryCode(callingCode);
                const validPhoneNo = validatePhoneNo(phoneNo);

                if(validCountryCode){
                  Toast.show({
                    type:ALERT_TYPE.WARNING,
                    title:"Warning",
                    textBody:validCountryCode
                  });
                }else if(validPhoneNo){
                  Toast.show({
                    type:ALERT_TYPE.WARNING,
                    title:"Warning",
                    textBody:validPhoneNo
                  });
                }else{
                  navigation.replace("AvatarScreen");
                }

                setUserData((previous)=>({
                  ...previous,
                  countryCode:country? `+${country.callingCode}`:callingCode,
                  contactNo:phoneNo,
                }))
                
              }}
            >
              <Text className="text-xl font-bold text-slate-50">Next</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
      
    </SafeAreaView>
  );
}
