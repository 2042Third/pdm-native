import {colors, styles} from "../../../../../PDMNotes/assets/Style";
import {Text, View} from "react-native";
import * as React from "react";
import Icon from 'react-native-ionicons';

let FooterBar;
export default  FooterBar =()=> {
    return (
        <View style={styles.container}>
            <Icon ios="cog" android="cog" size={24}
                  color={colors["--foreground-default"]}  />
            <Text style={styles.somet}>Hi</Text>
        </View>
    );
}
