import {createStackNavigator} from "@react-navigation/stack";
import SettingsScreen from "../views/SettingPage";

const Stack = createStackNavigator();
let FooterNav;
export default  FooterNav =(props)=> {
    // const Stack = props.Stack;
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/*<Tab.Screen name="Home" component={HomeScreen} />*/}
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
}