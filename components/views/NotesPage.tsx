import {Button, View} from "react-native";
import {styles} from "../../assets/Style";
import React from "react";

export default function NotesView({ navigation }) {
    return (
        <View style={styles.mview}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}