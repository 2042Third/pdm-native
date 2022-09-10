import React from "react";
import { Component } from "react";
import { Button, Modal, TextInput, View } from "react-native";
import connect from "react-redux/es/components/connect";
import { colors, styles } from "../../../assets/Style";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";
import { decryptLocal } from "../../handle/redux/reducers/user/userinfoEnter";

export class EnterModalOneType{
  visible:boolean=true;
}

const EnterModalOne = ({ visible }: EnterModalOneType ) => {
  // state = {
  //   modalVisible: false,
  //   epw:"",
  //   isFocused3:false,
  // };

  // constructor(props){
  //   super(props);
  //   const {visible }= props;
  //   this.setModalVisible(visible)
  // }

  // onEpw = (input: string) => {
  //   this.setState({ ...this.state, epw: input });

  // }
  // onFocusingHeader3 = (focus: boolean) => {
  //   this.setState({ ...this.state, isFocused3: focus });

  // }

  // setModalVisible = (visible:boolean) => {
  //   this.setState({...this.state, modalVisible: visible });
  // }


  

    const modalVisible = visible;

    const [epw, onEpw] = React.useState('');
    const [isFocused3, onFocusingHeader3] = React.useState(false);
    const dispatch = useAppDispatch();
    const eUserEnter = useAppSelector(state => state.encryptedUserEnter);

    const onSubmit = () => {
      console.log("Logging local");
      dispatch(
        decryptLocal({ epw: epw, encUserEnter: eUserEnter.userEnter })
      )

    };
    console.log("EnterModalOne rendering ... ");
    return(
        <Modal
          visible={modalVisible}
          style={[styles.loginContainer, styles.mainColor, { flex: 1 }]}
        >
        <TextInput
          value={epw}
          onChangeText={onEpw}
          placeholderTextColor={colors['--foreground-tertiary']}
          placeholder={"Application Password"}
          secureTextEntry={true}
          style={[styles.loginInput, styles.inputAreaColor
            , {
            backgroundColor: isFocused3 ? colors['--background-tertiary'] : colors['--background-default'],

          }
          ]}
          onFocus={() => { onFocusingHeader3(true); }}
          onBlur={() => { onFocusingHeader3(false); }}
        ></TextInput>

        {/* Buttons */}
        <View style={[styles.btnContainer]}>
          <Button title={"Done"} color={colors['--background-light']}
            onPress={onSubmit}
          ></Button>
        </View>
        </Modal>
    );
};
export default EnterModalOne;

// const mapDispatchToProps = (dispatch,ownProps) => {
//   return {
//     signIn: () => dispatch(
//         decryptLocal({ epw: ownProps.state.epw, encUserEnter: ownProps.eUserEnter.userEnter })
//       )
      
//   }
// };
// export default connect(null, mapDispatchToProps)(EnterModalOne)