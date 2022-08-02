
import {styles} from "../../assets/Style";
import {Text, View} from "react-native";
import {Ionicons, } from "@expo/vector-icons";
import * as React from "react";


let FooterBar;
export default  FooterBar =()=> {
    return (
        <View style={styles.container}>
            <Ionicons name="settings-outline" size={24} color="black" />
            <Text style={styles.somet}>Hi</Text>
        </View>
    );
}