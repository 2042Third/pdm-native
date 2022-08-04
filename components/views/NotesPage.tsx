import {Button, TextInput, View} from "react-native";
import {styles, colors} from "../../assets/Style";
import React from "react";

export default function NotesView({ navigation }) {

    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    return (
        <View style={[styles.notesBox, styles.container]}>
            <TextInput
                style={[styles.notesHeaderStyle, styles.inputAreaColorSecond]}
                onChangeText={onChangeText}
                placeholder="Unnamed Note"
                placeholderTextColor= {colors['--foreground-tertiary']}
                value={text}
            />
            <TextInput
                multiline
                style={[styles.notesEditStyle, styles.inputAreaColor]}
                onChangeText={onChangeNumber}
                value={number}
            />
        </View>
    );
}