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

export const styles = StyleSheet.create({

    // TEST END
    // GENERAL STYLES
    inputAreaColor:{
        backgroundColor: colors["--background-light"],
        color: colors["--foreground-default"]
    },
    inputAreaColorSecond:{
        // backgroundColor: isFocused?colors["--background-default"],
        color: colors["--foreground-default"]
    },
    container: {
        flex: 1,
        backgroundColor: colors["--background-default"],
        color: colors["--foreground-default"]
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    welcome: {
        fontSize: 20
    },
    mview:{
        backgroundColor: colors["--background-secondary"],
        color: colors["--foreground-default"],
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    bottommview:{
        backgroundColor: colors["--background-secondary"],
        color: colors["--foreground-default"],
        flexDirection: "column",
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    somet: {
        fontSize: 20,
        color: colors["--foreground-default"]
    },
    drawerStyle: {
        backgroundColor: colors["--background-secondary"],
        color: colors["--foreground-default"],
    },
    drawerContentStyle: {
        backgroundColor: colors["--background-secondary"],
        color: colors["--foreground-default"],
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
    },
    drawerHeaderStyle:{
        backgroundColor: colors["--background-tertiary"],
    },
    drawerHeaderTitleStyle:{
        color: colors["--foreground-secondary"],
        fontWeight: 'bold',
    },
    openSpace:{
        flexDirection: 'column',

    },
    drawerItemStyle:{

        flex: 1,
        color: colors["--foreground-default"],
        flexDirection: "column",
    },
    menuContentCenter:{
        color: colors["--foreground-default"],
        flexDirection: "column",
        paddingTop: 100,
    },
    footerViewStyle:{
        borderStyle: "solid",
        borderWidth:2,
        borderTopColor: colors['--foreground-light'],
        borderBottomColor: colors['--background-secondary'],
        borderLeftColor: colors['--background-secondary'],
        borderRightColor: colors['--background-secondary'],
        // borderRadius:8,
    },
    footerContent:{
        fontSize: 20,
        padding: 20,
        color: 'green',
        // color: colors["--foreground-default"]
    },
    footerContentText:{
        fontSize: 12,
        padding: 20,
        color: 'greenyellow',
        // color: colors["--foreground-default"]
    },
    // NOTES STYLES
    notesBox:{
        flexDirection: 'column',
        alignItems: 'stretch',

    },
    notesHeaderStyle:{
        fontSize: 20,
        outline: 0,
        border: "none",
        padding: 5,
        borderRadius: 5,
        margin: 7,
        paddingLeft: 7,
        paddingRight: 7,
    },
    notesEditStyle:{
        alignItems: 'stretch',
        fontSize: 16,
        outline: 0,
        flexGrow:1,
        border: "none",
        padding: 15,
        borderRadius: 5,
        margin: 7,
        resize: 'none',
        wordWrap: 'breakWord',
    },


});
