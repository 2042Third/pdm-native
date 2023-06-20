

import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View, Keyboard, Text, Easing } from "react-native";
import { PanGestureHandler, State, TextInput } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring, useAnimatedReaction, runOnJS, withDecay, withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get('window');

const CustomTextInput = () => {
  const translateX = useSharedValue(0);
  const displacement = useSharedValue(0);
  const isGestureActive = useSharedValue(0);
  const isKeyboardVisible = useSharedValue(0);
  const snapThreshold = 0.21;
  const initialDirection = useSharedValue('none'); // 'none', 'horizontal', 'vertical'

  // Keyboard listeners
  const keyboardShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
      isKeyboardVisible.value = 1;
    }
  );
  const keyboardHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
      isKeyboardVisible.value = 0;
    }
  );



  const dismissKeyboard = () => {
    if(isKeyboardVisible.value === 1)
      Keyboard.dismiss();
  };

  const customRound = (num:number,displacementRatio:number) => {
    'worklet';

    const lowerBound = Math.floor(num);
    const upperBound = Math.ceil(num);

    if (displacementRatio> 0){
      if(Math.abs(displacementRatio) >= snapThreshold){
        return upperBound;
      }
      return lowerBound;
    }
    else if (displacementRatio < 0){
      if(Math.abs(displacementRatio) >= snapThreshold){
        return lowerBound;
      }
      return upperBound;
    }

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
    onEnd: ({ velocityX }) => {
      const t = Math.abs(translateX.value / velocityX);
      const decel = (displacement.value/Math.abs(displacement.value))
        *(Math.abs(velocityX)/(0.01+t*0.1));
      // const decel = (displacement.value/Math.abs(displacement.value))*width*80;
      const tts = Math.abs(velocityX / decel);
      const projection = (translateX.value + decel*tts * tts);
      const projectedDisplacement = (displacement.value + decel*tts * tts);
      console.log('........................................................................');
      console.log(`Width: ${width}`);
      console.log(`displacement: ${displacement.value}`);
      console.log(`velocityX: ${velocityX}, translateX: ${translateX.value}`);
      console.log(`ratio:${translateX.value / width}`);
      console.log(`displacement ratio: ${displacement.value / width}`)
      console.log(`Time length: ${t}`);
      console.log(`acceleration: ${velocityX / t}`);
      console.log(`decel time: ${tts}`);
      console.log(`projection: ${projection}`);
      console.log(`projection ratio: ${projection/width}`);
      console.log(`projected displacement: ${projectedDisplacement}`);
      console.log(`projected displacement ratio: ${projectedDisplacement/width}`);
      const approxEndPos = translateX.value ; // where it would be in 0.01s
      const approxEndPosRelativeToWidth = approxEndPos / width;
      const snapPoint = (velocityX===0 || displacement.value ===0)?
        customRound(approxEndPosRelativeToWidth, displacement.value / width) * width
        : customRound(projection/width, projectedDisplacement/width) * width
      ;

      translateX.value = withSpring(snapPoint
        , { damping: 20, stiffness: 50, mass: 0.52 }
        , () => {
          // We only dismiss the keyboard after the animation has finished.
          runOnJS(dismissKeyboard)();
        });
      isGestureActive.value = 0;
    },

  });

  useAnimatedReaction(() => {
    return isGestureActive.value;
  }, (result) => {
    if (result === 0) {
      runOnJS(dismissKeyboard)();
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

        <View
          style={[{width, height:'100%'}]}
        >
          <TextInput
            multiline={true}
            style={[
              { height:'100%', padding: 10, color: 'black', backgroundColor: 'gray', margin: 20},
            ]}
            placeholder="2 Type here..."
          />
        </View>

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
