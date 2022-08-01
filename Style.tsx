import { StyleSheet } from 'react-native';

export const colors = {
    "--foreground-default": "#dfdfdf",
    "--foreground-secondary": "#c3c2c2",
    "--foreground-tertiary": "#9c9b9b",
    "--foreground-quaternary": "#f4faff",
    "--foreground-light": "rgb(255, 255, 255)",

    "--background-default": "#2f3136",
    "--background-secondary": "#36393e",
    "--background-tertiary": "#42464D",
    "--background-light": "#585b60",

    "--primary-default": "#5dfdcb",
    "--primary-dark": "#24b286",
    "--primary-light": "#b2ffe7",

    "--error-default": "#ef3e36",
    "--error-dark": "#800600",
    "--error-light": "#ffcecc",

};

export const styless = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors["--background-default"],
        color: colors["--foreground-default"]
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    welcome: {
        fontSize: 20
    }
});

// export default class styles {
// }