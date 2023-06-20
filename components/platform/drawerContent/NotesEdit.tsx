

import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View, Keyboard, Text, Easing } from "react-native";
import { PanGestureHandler, State, TextInput } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring, useAnimatedReaction, runOnJS, withDecay, withTiming, useAnimatedProps,
} from "react-native-reanimated";

const { width } = Dimensions.get('window');

const CustomTextInput = () => {
  const translateX = useSharedValue(0);
  const displacement = useSharedValue(0);
  const velocity = useSharedValue(0);
  const isGestureActive = useSharedValue(0);
  const isKeyboardVisible = useSharedValue(0);
  const snapThreshold = 0.45;
  const initialDirection = useSharedValue('none'); // 'none', 'horizontal', 'vertical'
  const [editable, setEditable] = useState(true);
  const MAX_SCREENS = 3;
  const currentScreen = useSharedValue(0);


  const setEditableWithDelay = (value:boolean, delay:number) => {
    setTimeout(() => {
      setEditable(value);
    }, delay);
  };

  const callSetEditable = (value:boolean) => {
    setEditable(value);
  }

  useAnimatedReaction(() => {
    return { isGestureActive: isGestureActive.value };
  }, (current, previous) => {
    if (previous) {
      if (current.isGestureActive === 1) {
        // Gesture is active, dismiss the keyboard
        runOnJS(callSetEditable)(false);

      } else{
        // Gesture is not active but TextInput is focused
        // Delay keyboard appearance
        runOnJS(setEditableWithDelay)(true, 100);
      }
    }
  });

  // Keyboard listeners
  const keyboardShowListener = Keyboard.addListener(
    'keyboardWillShow',
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
    let lowerBound = Math.floor(num)<(-1*(MAX_SCREENS-1))?(-1*(MAX_SCREENS-1)):Math.floor(num);
    let upperBound = Math.ceil(num)>0?0:Math.ceil(num);

    if(displacementRatio>1){
      return lowerBound;
    }
    else if(displacementRatio<-1){
      return upperBound;
    }

    console.log(`num: ${num}, lowerBound: ${lowerBound}, upperBound: ${upperBound}`);
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
      ctx.velocityX = velocity.value;
      initialDirection.value = 'none';
      displacement.value = 0;
    },
    onActive: (event, ctx) => {
      isGestureActive.value=1;
      translateX.value = ctx.startX + event.translationX;
      displacement.value = event.translationX;
      velocity.value = event.velocityX;

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
      const decel = (displacement.value/Math.abs(displacement.value)) *(Math.abs(velocityX)/(0.1+t*0.1));
      const tts = Math.abs(velocityX / decel);
      const projection = (translateX.value + decel*tts * tts);
      const projectedDisplacement = (displacement.value + decel*tts * tts);
      // console.log('........................................................................');
      // console.log(`Width: ${width}`);
      // console.log(`displacement: ${displacement.value}`);
      // console.log(`velocityX: ${velocityX}, translateX: ${translateX.value}`);
      // console.log(`ratio:${translateX.value / width}`);
      console.log(`displacement ratio: ${displacement.value / width}`)
      // console.log(`Time length: ${t}`);
      // console.log(`acceleration: ${velocityX / t}`);
      // console.log(`decel time: ${tts}`);
      // console.log(`projection: ${projection}`);
      // console.log(`projection ratio: ${projection/width}`);
      // console.log(`projected displacement: ${projectedDisplacement}`);
      console.log(`projected displacement ratio: ${projectedDisplacement/width}`);
      const approxEndPos = translateX.value ; // where it would be in 0.01s
      const approxEndPosRelativeToWidth = approxEndPos / width;
      const approxScreen = customRound(approxEndPosRelativeToWidth, displacement.value / width);
      const projectionScreen = customRound(projection/width, projectedDisplacement/width);

      let snapScreen= (velocityX===0 || displacement.value ===0)?
        approxScreen
        : projectionScreen
      ;
      console.log(`snapScreen: ${snapScreen}`);
      console.log(`currentScreen.value!=0 : ${Math.abs(snapScreen-currentScreen.value)>1 &&currentScreen.value!=0 && currentScreen.value!=MAX_SCREENS-1}`);

      if (snapScreen!=currentScreen.value ){
        if (displacement.value>=0) {
          if (currentScreen.value===0)
            snapScreen = 0;
          else
            snapScreen=currentScreen.value+1;
        }
        else{
          if (currentScreen.value===-1*(MAX_SCREENS-1))
            snapScreen = -1*(MAX_SCREENS-1);
          else
            snapScreen=currentScreen.value-1;
        }
      }

      console.log(`currentScreen: ${currentScreen.value}`);
      console.log(`snapScreen: ${snapScreen}`);
      currentScreen.value = snapScreen;
      const snapPoint = snapScreen*width;

      translateX.value = withSpring(snapPoint
        , { damping: 10, stiffness: 20, mass: 0.1 }
        , () => {
          // We only dismiss the keyboard after the animation has finished.
          runOnJS(dismissKeyboard)();
        });
      isGestureActive.value = 0;
    },
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
            editable={editable}
          />
        </View>

        <View style={[{width, height:'100%'}]}>
          <TextInput
            multiline={true}
            style={[
              { height:'100%', padding: 10, color: 'black', backgroundColor: 'gray', margin: 20},]}
            placeholder="3 Type here..."
            scrollEnabled={initialDirection.value === 'vertical'}
            editable={editable}
          />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default CustomTextInput;
