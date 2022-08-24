import  PropTypes  from 'prop-types';
import React, { Component } from 'react';

import {
  Animated,
  Dimensions,
  EmitterSubscription,
  Keyboard,
  StyleSheet,
  TextInput,
  UIManager,
  View,
} from "react-native";
import { styles } from '../../assets/Style';
const { State: TextInputState } = TextInput;

export default class KeyboardShift extends Component {
  state = {
    shift: new Animated.Value(0),
  };
  private keyboardDidShowSub: EmitterSubscription | undefined;
  private keyboardDidHideSub: EmitterSubscription | undefined;
  static propTypes = PropTypes;
  private animationSpeed: number = 300;

  UNSAFE_componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  UNSAFE_componentWillUnmount() {
    if (this.keyboardDidShowSub)
      this.keyboardDidShowSub.remove();
    if (this.keyboardDidHideSub)
      this.keyboardDidHideSub.remove();
  }

  render() {
    const { children: renderProp } = this.props;
    const { shift } = this.state;
    return (
      <View style={[styles.shiftContainer,styles.mainColor ]}>
        <Animated.View style={[styles.shiftContainer,styles.mainColor ,{ transform: [{translateY: shift}] }]}>
          {renderProp()}
        </Animated.View>
      </View>
    );
  }

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedInput();

    currentlyFocusedField.measure((originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: gap,
          duration: this.animationSpeed,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: this.animationSpeed,
        useNativeDriver: true,
      }
    ).start();
  }
}



KeyboardShift.propTypes = {
  children: PropTypes.func.isRequired,
};
