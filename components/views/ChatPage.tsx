import {Button, Text, useWindowDimensions, View} from "react-native";
import {styles} from "../../assets/Style";
import React from "react";

export default function ChatView({ navigation }) {
    const window = useWindowDimensions();
    return (
        <View style={styles.mview}>
            <Text style={styles.somet}>Home Screen</Text>
            <Text style={styles.somet}>window width: ${window.width}</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}