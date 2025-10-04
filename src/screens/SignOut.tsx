import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SignOutScreen(){
    const auth = useContext(AuthContext);
    return(
        <SafeAreaView>
            
        </SafeAreaView>
    );
}