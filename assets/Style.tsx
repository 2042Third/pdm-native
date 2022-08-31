import {StyleSheet} from 'react-native';

export const colors = {
  '--foreground-default': '#dfdfdf',
  '--foreground-secondary': '#c3c2c2',
  '--foreground-tertiary': '#9c9b9b',
  '--foreground-quaternary': '#f4faff',
  '--foreground-light': 'rgb(255, 255, 255)',

  '--background-default': '#2f3136',
  '--background-secondary': '#36393e',
  '--background-tertiary': '#42464D',
  '--background-light': '#585b60',

  '--primary-default': '#5dfdcb',
  '--primary-dark': '#24b286',
  '--primary-light': '#b2ffe7',

  '--error-default': '#ef3e36',
  '--error-dark': '#800600',
  '--error-light': '#ffcecc',

  '--chat-box-1': '#6fc02c',
  '--chat-box-2': '#ffffff',
};

export const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: colors['--background-default'],
    borderRadius: 7,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 7,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  // TEST END
  // GENERAL STYLES
  shiftContainer: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  smallText: {
    color: colors['--foreground-tertiary'],
    fontSize: 9,
  },
  normalText: {
    color: colors['--foreground-default'],
    fontSize: 17,
  },
  menuButton:{
    padding: 9,
  },
  lightContainerColor:{
    backgroundColor: colors["--background-tertiary"]
  },
  centerTextContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTextPadding: {
    padding: 9,
    margin:7,
  },
  inputAreaColor: {
    backgroundColor: colors['--background-tertiary'],
    color: colors['--foreground-default'],
  },
  mainColor: {
    backgroundColor: colors['--background-default'],
    color: colors['--foreground-default'],
  },
  inputAreaColorSecond: {
    // backgroundColor: isFocused?colors["--background-default"],
    color: colors['--foreground-default'],
  },
  tooLongScroll: {
    overflow: 'scroll',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors['--background-default'],
    color: colors['--foreground-default'],
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
  },
  mview: {
    backgroundColor: colors['--background-secondary'],
    color: colors['--foreground-default'],
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainSigninStatus:{
    backgroundColor: colors['--background-secondary'],
    color: colors['--foreground-default'],
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    margin: 7,
    marginTop: 18,
  },
  mainSigninStatusText:{
    color: colors['--foreground-tertiary'],
    flex: 1,

  },
  bottommview: {
    backgroundColor: colors['--background-secondary'],
    color: colors['--foreground-default'],
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  somet: {
    fontSize: 20,
    color: colors['--foreground-default'],
  },
  drawerStyle: {
    backgroundColor: colors['--background-secondary'],
    color: colors['--foreground-default'],
  },
  drawerContentStyle: {
    backgroundColor: colors['--background-secondary'],
    color: colors['--foreground-default'],
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerHeaderStyle: {
    // flexDirection: "row",
    // alignISelf: "stretch",
    // // flex: 1,
    // // width: 100,
    // height: 50,
    // justifyContent: "space-between",
    backgroundColor: colors['--background-tertiary'],
  },
  drawerHeaderIconLeft: {
    // alignSelf: "flex-start",
    padding: 10,
  },
  drawerHeaderIconRight: {
    padding: 10,
    // alignSelf: "flex-end",
  },
  drawerHeaderTitleStyle: {
    color: colors['--foreground-secondary'],
    fontWeight: 'bold',
    padding: 10,
    fontSize:18,
  },
  openSpace: {
    flexDirection: 'column',
  },
  drawerItemStyle: {
    flex: 1,
    color: colors['--foreground-default'],
    flexDirection: 'column',
  },
  menuContentCenter: {
    color: colors['--foreground-default'],
    flexDirection: 'column',
    paddingTop: 100,
  },
  noteMenuViewStyle: {

  },
  noteMenuContent:{
    fontSize: 20,
    padding: 20,
    color: 'green',
  },
  footerViewStyle: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderTopColor: colors['--foreground-light'],
    borderBottomColor: colors['--background-secondary'],
    borderLeftColor: colors['--background-secondary'],
    borderRightColor: colors['--background-secondary'],
    // borderRadius:8,
  },
  footerContent: {
    fontSize: 20,
    padding: 20,
    color: 'green',
    // color: colors["--foreground-default"]
  },
  footerContentText: {
    fontSize: 12,
    padding: 20,
    color: 'greenyellow',
    // color: colors["--foreground-default"]
  },
  // NOTES STYLES
  notesBox: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  notesHeaderStyle: {
    fontSize: 20,
    outline: 0,
    border: 'none',
    padding: 5,
    borderRadius: 5,
    margin: 7,
    paddingLeft: 7,
    paddingRight: 7,
  },
  notesEditStyle: {
    alignItems: 'stretch',
    fontSize: 16,
    outline: 0,
    flexGrow: 1,
    border: 'none',
    padding: 15,
    paddingTop: 15,
    borderRadius: 24,
    margin: 10,
    resize: 'none',
    wordWrap: 'breakWord',
  },
  notesListingItemContainer:{
    height: 30,
    margin: 7,
    padding: 3,
  },
  row: {
    flexDirection: 'row',
    overflow: 'visible',
  },
  // CHAT STYLES
  chatMainBox: {
    // flexDirection: 'column',
    // alignItems: 'stretch',
  },
  chatDisplayBox: {},
  chatEditStyle: {
    // alignItems: ,
    fontSize: 16,
    outline: 0,
    border: 'none',
    padding: 6,
    paddingTop: 6,
    borderRadius: 6,
    margin: 10,
  },
  chatBox: {
    margin: 6,
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 6,
    flexShrink: 1,
  },
  chatDisplay: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  // SETTINGS
  header: {
    fontSize: 20,
  },
  settingsContainer: {
    margin: 3,
    padding: 7,
  },
  settingsMenu: {
    margin: 0,
    padding: 7,
  },
  settingsItem: {
    margin: 3,
    padding: 7,
    borderRadius: 6,
  },

  // button
  styledButton1: {
    alignContent: 'space-around',
    justifyContent: 'space-evenly',
    outline: 0,
    border: 'none',
    padding: 7,
    paddingLeft:10,
    paddingRight:10,
    // paddingTop: 15,
    borderRadius: 20,
    margin: 10,

  },

  // login
  loginContainer:{
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  loginInputContainer:{
    flex:1,
    flexDirection: "column",
    alignItems: "stretch",
    alignContent: "stretch",
  },
  loginInput:{
    height: 40,
    borderColor: colors['--foreground-tertiary'],
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    color: colors['--background-light'],
    marginTop: 12,
  },

});
