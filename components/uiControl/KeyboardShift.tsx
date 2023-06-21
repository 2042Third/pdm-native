import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  View,
} from "react-native";
import { styles } from '../../assets/Style';

class KeyboardShift extends Component {
  state = {
    shift: new Animated.Value(0),
  };
  keyboardDidShowSub = null;
  keyboardDidHideSub = null;
  currentlyFocusedRef = null;
  static propTypes = {
    children: PropTypes.func.isRequired,
  };
  animationSpeed = 250;

  componentDidMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub && this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub && this.keyboardDidHideSub.remove();
  }

  render() {
    const { children: renderProp } = this.props;
    const { shift } = this.state;
    return (
      <View style={[styles.shiftContainer,styles.mainColor ]}>
        <Animated.View style={[styles.shiftContainer,styles.mainColor ,{ transform: [{translateY: shift}] }]}>
          {renderProp(this.onFocus)}
        </Animated.View>
      </View>
    );
  }

  onFocus = (ref) => {
    this.currentlyFocusedRef = ref;
  }

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height + event.endCoordinates.height/3; // Padding of 1/3 of the keyboard height

    if (this.currentlyFocusedRef && typeof this.currentlyFocusedRef.measure === 'function') {
      this.currentlyFocusedRef.measure((x, y, width, height, pageX, pageY) => {
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

export default KeyboardShift;
