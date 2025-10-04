import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ThemeOption, useTheme } from "../theme/ThemeProvider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useUserProfile } from "../socket/UseUserProfile";
import { uploadProfileImage } from "../api/UserService";
import { AuthContext } from "../components/AuthProvider";

const options: ThemeOption[] = ["light", "dark", "system"];
type ProfileScreenProp = NativeStackNavigationProp<RootStack, "ProfileScreen">;

export default function ProfileScreen() {
  const { applied } = useTheme();
  const navigation = useNavigation<ProfileScreenProp>();
  const userProfile = useUserProfile();
 

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Profile",
      headerStyle: {
        backgroundColor: applied === "dark" ? "black" : "white",
      },
      headerTintColor: applied === "dark" ? "white" : "black",
    });
  }, [navigation, applied]);

  const auth = useContext(AuthContext);

  const [image, setImage] = useState<string | null>(null);
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    
       await uploadProfileImage(String(auth? auth.userId:0),result.assets[0].uri);

      
}
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-red-50">
      <View className="flex-1 justify-center">
        <View className="items-center">
          {image ? (
            <Image
              className="w-40 h-40 rounded-full border-gray-300 border-2"
              source={{uri:image}}
            />
          ) : (
            <Image
              className="w-40 h-40 rounded-full border-gray-300 border-2"
                source={{ uri: userProfile?.profileImage ? `${userProfile.profileImage}?t=${Date.now()}` : undefined }}
            />
          )}
        </View>
        <View className="my-1">
          <TouchableOpacity
            className="justify-center items-center h-12"
            onPress={()=>{
                pickImage();
              
            }}
          >
            <Text className="font-bold text-green-600 text-lg">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View className="justify-start flex-col gap-y-2 my-3">
          <View className="flex-row gap-x-3 items-center">
            <Feather name="user" size={24} color="black" />
            <Text className="font-bold text-lg">Name</Text>
          </View>
          <Text className="font-bold text-lg">{userProfile?.firstName} {userProfile?.lastName}</Text>
        </View>
        <View className="justify-start flex-col gap-y-2my-2">
          <View className="flex-row gap-x-3 items-center">
            <Feather name="phone" size={24} color="black" />
            <Text className="font-bold text-lg">Phone</Text>
          </View>
          <Text className="font-bold text-lg">{userProfile?.countryCode} {userProfile?.contactNo}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
