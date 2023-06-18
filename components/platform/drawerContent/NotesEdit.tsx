

import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View, Keyboard } from "react-native";
import { PanGestureHandler, TextInput } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring, useAnimatedReaction, runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get('window');

const CustomTextInput = () => {
  const translateX = useSharedValue(0);
  // const [isGestureActive, setGestureActive] = useState(false);
  const isGestureActive = useSharedValue(0);
  const snapThreshold = 0.3;

// Define your custom rounding function
  const customRound = (num:number) => {
    'worklet';

    const lowerBound = Math.floor(num);
    const upperBound = Math.ceil(num);

    if (num - lowerBound < snapThreshold) return lowerBound;
    if (upperBound - num < snapThreshold) return upperBound;

    return Math.round(num);
  }
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      isGestureActive.value=1;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (_) => {
      translateX.value
        // = withSpring(Math.round(translateX.value / width) * width
        = withSpring(customRound(translateX.value / width) * width
      , { damping: 20, stiffness: 50, mass: 0.4 });
      // setGestureActive(false);
      isGestureActive.value=0;
    },
  });

  useAnimatedReaction(() => {
    return isGestureActive.value;
  }, (result) => {
    if (result === 0) {
      runOnJS(Keyboard.dismiss)();
    }
  });


  const style = useAnimatedStyle(() => {
    return {
      flexDirection: 'row',
      width: width * 3, // for 3 TextInputs
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={style}>
        {/* Your TextInputs */}

        <View style={[{width, height:'100%'}]}>
          <TextInput
            multiline={true}
            style={[
              { height:'100%', padding: 10, color: 'black', backgroundColor: 'gray', margin: 20},]}
            placeholder="1 Type here..."
          />
        </View>
        <View style={[{width, height:'100%'}]}>
          <TextInput
            multiline={true}
            style={[
              { height:'100%', padding: 10, color: 'black', backgroundColor: 'gray', margin: 20},]}
            placeholder="2 Type here..."
          />
        </View>
        <View style={[{width, height:'100%'}]}>
          <TextInput
            multiline={true}
            style={[
              { height:'100%', padding: 10, color: 'black', backgroundColor: 'gray', margin: 20},]}
            placeholder="3 Type here..."
          />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default CustomTextInput;
