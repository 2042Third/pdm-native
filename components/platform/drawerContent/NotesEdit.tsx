

import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View, Keyboard, Text } from "react-native";
import { PanGestureHandler, State, TextInput } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring, useAnimatedReaction, runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get('window');

const CustomTextInput = () => {
  const translateX = useSharedValue(0);
  const displacement = useSharedValue(0);
  const isGestureActive = useSharedValue(0);
  const snapThreshold = 0.24;
  const initialDirection = useSharedValue('none'); // 'none', 'horizontal', 'vertical'


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
      initialDirection.value = 'none';
      displacement.value = 0;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      displacement.value = event.translationX;

      // Check if we've set an initial direction yet
      if (initialDirection.value === 'none') {
        // Calculate the ratio of the absolute x/y translation
        // to determine the general direction
        const ratio = Math.abs(event.translationX) / Math.abs(event.translationY);
        if (ratio > 1) {
          initialDirection.value = 'horizontal';
        } else {
          initialDirection.value = 'vertical';
        }
      }

      // If we're moving horizontally and there's vertical input, ignore it
      if (initialDirection.value === 'horizontal' && event.translationY !== 0) {
        event.translationY = 0;
      }
    },
    onEnd: (_) => {
      console.log(`displacement/width=${displacement.value/width}`);
      translateX.value
        = withSpring(customRound(translateX.value / width) * width
      , { damping: 20, stiffness: 50, mass: 0.52 }
      , () => {
        // We only dismiss the keyboard after the animation has finished.
        runOnJS(Keyboard.dismiss)();
      });
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
    <PanGestureHandler
      onGestureEvent={gestureHandler}
    >
      <Animated.View style={style}>
        {/* Your TextInputs */}

        <View style={[{width, height:'100%'}]}>
          {/*<TextInput*/}
          {/*  multiline={true}*/}
          {/*  style={[*/}
          {/*    { flex:1, padding: 10, color: 'black', backgroundColor: 'gray', margin: 20},]}*/}
          {/*  placeholder="1 Type here..."*/}
          {/*  scrollEnabled={initialDirection.value === 'vertical'}*/}
          {/*/>*/}
          <Text
            style={[
              { flex:1, padding: 10, color: 'black', backgroundColor: 'gray', margin: 20},]}
          >Some texts here...</Text>
        </View>

        <PanGestureHandler
          onHandlerStateChange={event => {
            if (event.nativeEvent.oldState === State.ACTIVE) {
              Keyboard.dismiss();
            }
          }}
          activeOffsetY={5} // vertical swipes less than this value will fail
        >
          <View style={[{width, height:'100%'}]}>
            <TextInput
              multiline={true}
              style={[
                { height:'100%', padding: 10, color: 'black', backgroundColor: 'gray', margin: 20},
              ]}
              placeholder="2 Type here..."
            />
          </View>
        </PanGestureHandler>

        <View style={[{width, height:'100%'}]}>
          <TextInput
            multiline={true}
            style={[
              { height:'100%', padding: 10, color: 'black', backgroundColor: 'gray', margin: 20},]}
            placeholder="3 Type here..."
            scrollEnabled={initialDirection.value === 'vertical'}
          />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default CustomTextInput;
