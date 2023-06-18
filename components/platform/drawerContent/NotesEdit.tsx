// import React, { useEffect, useRef, useState } from "react";
// import { Animated, Dimensions, PanResponder, Text, TextInput, View } from "react-native";
// import {  ScrollView  } from 'react-native-gesture-handler';
//
// import { useAppSelector } from "../../handle/redux/hooks";
// import NotesView from "../../views/Notes/NotesPage";
// import { styles } from "../../../assets/Style";
//
// const windowWidth = Dimensions.get('window').width;
//
// const NotesEdit = () => {
//   // const translateX = new Animated.Value(0);
//   // const header = useAppSelector(state => state.notesHeaderInfo);
//   //
//   // const onGestureEvent = Animated.event(
//   //   [{ nativeEvent: { translationX: translateX } }],
//   //   { useNativeDriver: true }
//   // );
//   const [isFocused, setIsFocused] = useState(false);
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         if (isFocused) {
//           setIsFocused(false);
//         }
//       },
//       onPanResponderMove: (evt, gestureState) => {
//         // You can handle the horizontal swipe here.
//       },
//     })
//   ).current;
//
//
//   return (
//     // <PanGestureHandler
//     //   onGestureEvent={onGestureEvent}
//     //   onHandlerStateChange={onGestureEvent}>
//     //   <Animated.View
//     //     style={{
//     //       flex: 1,
//     //       flexDirection: 'row',
//     //       transform: [{ translateX: translateX }],
//     //     }}>
//     //     <View style={[styles.container]}>
//     //       < NotesHeader header={header} />
//     //       <ScrollView>
//     //         <View style={[styles.container]}>
//     //           <TextInput style={[styles.inputAreaColor]}>Note Editor</TextInput>
//     //           {/*<Text style={[styles.inputAreaColor]}>Note Editor</Text>*/}
//     //           <NotesView></NotesView>
//     //         </View>
//     //         {/*<NotesMenu ></NotesMenu>*/}
//     //       </ScrollView>
//     //     </View>
//     //   </Animated.View>
//     // </PanGestureHandler>
//
//     // // hrizontal Scroll
//     // <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
//     //   <View style={{ width: windowWidth }}>
//     //     <NotesView></NotesView>
//     //   </View>
//     //   <View style={[styles.container,{ width: windowWidth ,}]}>
//     //     <Text>Page 2</Text>
//     //   </View>
//     // </ScrollView>
//
//     //
//     <View style={{flex: 1, flexDirection: 'row'}}>
//       <View {...panResponder.panHandlers} style={{flex: 1}}>
//         <TextInput
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//         />
//       </View>
//       <View style={{flex: 1, backgroundColor: '#eee'}}>
//         {/* You can replace this Text with your list element */}
//         <Text>List element</Text>
//       </View>
//     </View>
//   );
// };
//
// export default NotesEdit;


// import React, { useState, useRef } from 'react';
// import { View, TextInput, PanResponder, Animated, Text } from "react-native";
//
// const NoteEditor = () => {
//   const [isFocused, setIsFocused] = useState(false);
//   const translateX = useRef(new Animated.Value(0)).current;
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         if (isFocused) {
//           setIsFocused(false);
//         }
//       },
//       onPanResponderMove: Animated.event(
//         [null, { dx: translateX }], // dx is the accumulated distance of the gesture since the touch started
//         { useNativeDriver: false }
//       ),
//       onPanResponderRelease: () => {
//         Animated.spring(translateX, {
//           toValue: 0,
//           useNativeDriver: false
//         }).start();
//       },
//     })
//   ).current;
//
//   return (
//     <View style={{ flex: 1 }}>
//       <Animated.View
//         {...panResponder.panHandlers}
//         style={{
//           flex: 1,
//           flexDirection: 'row',
//           width: '200%', // This is double the screen width
//           transform: [{ translateX }]
//         }}
//       >
//         <View style={{ flex: 1 }}>
//           <TextInput
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//           />
//         </View>
//         <View style={{ flex: 1, backgroundColor: '#eee' }}>
//           {/* You can replace this Text with your list element */}
//           <Text>List element</Text>
//         </View>
//       </Animated.View>
//     </View>
//   );
// };
//
// export default NoteEditor;

import React from 'react';
import { Dimensions, View } from "react-native";
import { PanGestureHandler, TextInput } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const CustomTextInput = () => {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (_) => {
      translateX.value = withSpring(Math.round(translateX.value / width) * width);
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      flexDirection: 'row',
      width: width * 3, // for 3 TextInputs
      transform: [{ translateX: translateX.value }],
    };
  });

  const style2 = useAnimatedStyle(() => {
    return {
      width: width,
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
