

import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View, Keyboard, Text, SafeAreaView, Platform, KeyboardAvoidingView } from "react-native";
import { PanGestureHandler, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring, useAnimatedReaction, runOnJS
} from "react-native-reanimated";
import NotesMenuEditor from "../../views/Notes/NotesMenuEditor";
import { colors, styles } from "../../../assets/Style";
import { NotesMsg } from "../../handle/types";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";
import { userInfoStatus } from "../../handle/redux/selectors/selectorNoteHeads";
import { dispatch } from "react-native-navigation-drawer-extension/lib/events";
const { width, height } = Dimensions.get('window');
import { updateEditsContent, updateEditsHead, updateNote } from '../../handle/redux/reducers/notes/noteEditor';
import { updateNotesHeaderInfo } from "../../handle/redux/reducers/notes/notesHeaderInfo";
enum updateStatus{
  AllUpdated = "Up to date",
  Updating = "Updating...",
  UpdateFail = "Error Updating"
}
const NotesCustomEditor = () => {
  const translateX = useSharedValue(0);
  const displacement = useSharedValue(0);
  const velocity = useSharedValue(0);
  const isGestureActive = useSharedValue(0);
  const snapThreshold = 0.45;
  const [initialDirection, setInitialDirection] = useState('none'); // 'none', 'horizontal', 'vertical'
  // const initialDirection = useSharedValue('none'); // 'none', 'horizontal', 'vertical'
  const [editable, setEditable] = useState(true);
  const MAX_SCREENS = 2;
  const currentScreen = useSharedValue(0);

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollViewRef = useRef(null);

  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const noteEditor:NotesMsg = useAppSelector(state => state.noteEditor);
  const userStatus: string = useAppSelector(state => userInfoStatus);

  const [headerValue, onChangeText] = React.useState(noteEditor.head);
  const [noteValue, onChangeNote] = React.useState(noteEditor.content);
  const [dirty, onDirty] = React.useState(false);
  const [waitValue, onWaitValue] = React.useState(0);
  const [isFocused, onFocusingHeader] = React.useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {

    onChangeText(noteEditor.head);
    console.log(`There is editing head, head \"${noteEditor.head}\", content: \"${noteEditor.content}\"`);
  }, [noteEditor.head]);

  /**
   * When receiving from the web
   *
   * */
  useEffect(() => {
    onChangeNote(noteEditor.content);
    console.log(`There is editing content, head \"${noteEditor.head}\", content: \"${noteEditor.content}\"`);
  }, [noteEditor.content]);


  useEffect(() => {
    console.log(`Note status changed to ${noteEditor.status}`);
    console.log(`Note status info is ${noteEditor.statusInfo}`);
    console.log(`ntype noteEditor.statusInfo is ${ noteEditor.ntype}`);
    if(noteEditor.ntype === "retrieve_return" && noteEditor.statusInfo === "fulfilled"){
      handleNavigation("first");
      console.log(`Navigation action triggered`);
    }
    }, [noteEditor.statusInfo])

  /**
   * Condition checkers.
   * */
  const shouldNotUpdateNote = () => {
    return noteEditor.status === "fail" || noteEditor.note_id === '';
  }

  const onStartingWrite = () => {
    if(!dirty){
      onWaitValue(waitValue=>0);
      onDirty(dirty=>true);
      dispatch(updateNotesHeaderInfo(updateStatus.Updating));
      console.log(`pushing value => ${waitValue}, dirty=${dirty}`);
    }
  }


  const noUpdate = () => {
    console.log(`No update: head=${noteEditor.head}, noteHead=${headerValue}`)
  }
  const noUpdateContent = () => {
    console.log(`No update: Content=${noteEditor.content},\n noteContent=${noteValue}`)
  }
  /**
   * Update operations.
   *
   * */
  const onFinishedEditContent = async () => {
    if (shouldNotUpdateNote()) {
      return;
    }
    try {
      await dispatch(updateEditsContent( noteValue))
    }
    catch (e) {
      console.log("Dispatch update content failed.");
      console.log(e);
      return;
    }

    await dispatch(updateNote(noteValue,headerValue));
    console.log(`Finished update dispatch content. Note obj => ${JSON.stringify(noteEditor)}`);
  };

  const isDuplicateHead = () => {
    return headerValue === noteEditor.head;
  }

  const isDuplicateContent = () => {
    return noteValue === noteEditor.content;
  }

  const isDuplicateAll =() => {
    return isDuplicateContent() && isDuplicateHead();
  }

  /**
   * Only used in "on end edit"
   * */
  const onFinishedEditHead= async () => {
    if (shouldNotUpdateNote()) {
      return;
    }
    try {
      await dispatch(updateEditsHead(headerValue));
    }
    catch (e) {
      console.log("Dispatch update head failed.");
      console.log(e);
      return;
    }

    await dispatch(updateNote(noteValue, headerValue));
    console.log(`Finished update dispatch head. Note obj => ${JSON.stringify(noteEditor)}`);
  };

  const handleScrollViewLayout = event => {
    const { height } = event.nativeEvent.layout;
    setScrollViewHeight(height);
  };


  const handleScroll = () => {
    // If the ScrollView starts scrolling, we disable the TextInput
    if (!isScrolling) {
      setIsScrolling(true);
      setEditable(false);
    }
  }

  const handleScrollEnd = () => {
    // Once the ScrollView stops scrolling, we delay the re-enabling of the TextInput
    if (isScrolling) {
      setIsScrolling(false);
      setTimeout(() => {
        setEditable(true);
      }, 400);
    }
  }

  /**
   * Navigation function that move the screen the position of snapPoint.
   * */
  const navigateTo = (snapPoint:number) => {
    'worklet';

    translateX.value = withSpring(snapPoint, { damping: 10, stiffness: 20, mass: 0.1 }, () => {
      console.log("[withSpring callback] snapping point achieved");
    });
  };

  /**
   * Handle navigation to a screen.
   * */
  const handleNavigation = (destination:string) => {
    let snapPoint;

    // Define snapPoints according to your screens, e.g.:
    switch(destination) {
      case 'first':
        currentScreen.value = 0;
        snapPoint = 0;
        break;
      case 'second':
        currentScreen.value = 1;
        snapPoint = -width;
        break;
      case 'third':
        currentScreen.value = 2;
        snapPoint = -width*2;
        break;
      default:
        currentScreen.value = 0;
        snapPoint = 0;
        break;
    }

    runOnJS(navigateTo)(snapPoint);
  }


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
        runOnJS(setEditableWithDelay)(true, 400);
      }
    }
  });

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
      runOnJS(setInitialDirection)('none');
      // initialDirection.value = 'none';
      displacement.value = 0;
    },
    onActive: (event, ctx) => {
      isGestureActive.value=1;
      translateX.value = ctx.startX + event.translationX;
      displacement.value = event.translationX;
      velocity.value = event.velocityX;

      // Check if we've set an initial direction yet
      if (initialDirection === 'none') {
        // Calculate the ratio of the absolute x/y translation
        // to determine the general direction
        const ratio = Math.abs(event.translationX) / Math.abs(event.translationY);
        if (ratio > 1) {
          runOnJS(setInitialDirection)('horizontal');
          // initialDirection.value = 'horizontal';
        } else {
          runOnJS(setInitialDirection)('vertical');
          // initialDirection.value = 'vertical';
        }
      }
    },
    onEnd: ({ velocityX }) => {

      const t = Math.abs(translateX.value / velocityX);
      const decel = (displacement.value/Math.abs(displacement.value)) *(Math.abs(velocityX)/(0.1+t*0.1));
      const tts = Math.abs(velocityX / decel);
      const projection = (translateX.value + decel*tts * tts);
      const projectedDisplacement = (displacement.value + decel*tts * tts);
      const approxEndPos = translateX.value ; // where it would be in 0.01s
      const approxEndPosRelativeToWidth = approxEndPos / width;
      const approxScreen = customRound(approxEndPosRelativeToWidth, displacement.value / width);
      const projectionScreen = customRound(projection/width, projectedDisplacement/width);

      let snapScreen= (velocityX===0 || displacement.value ===0)?
        approxScreen
        : projectionScreen
      ;

      if (snapScreen!=currentScreen.value ){ // Just making sure no weird stuff.
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

      currentScreen.value = snapScreen;
      const snapPoint = snapScreen*width;

      translateX.value = withSpring(snapPoint
        , { damping: 10, stiffness: 20, mass: 0.1 }
        , () => {
          // We only dismiss the keyboard after the animation has finished.
          // NOW, this is achieved through changing the "editable" prop of the TextInput
          // console.log("[withSpring callback] dismissing keyboard, currently removed.");
          // runOnJS(dismissKeyboard)();
        });
      isGestureActive.value = 0;
      runOnJS(setInitialDirection)('none');
      // initialDirection.value = 'none';
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      flexDirection: 'row',
      height: '100%',
      width: width * 3, // for 3 TextInputs
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <PanGestureHandler
      onGestureEvent={gestureHandler}
    >
      <Animated.View style={[style,]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[{ width, height:'100%',
            backgroundColor: colors['--background-default'],},styles.notesBox]}
        >
          <SafeAreaView style={{ flex: 1 }}>

            {/*Header Start*/}
            <TextInput
              style={[
                styles.notesHeaderStyle,
                styles.inputAreaColorSecond,
                {
                  backgroundColor: isFocused ? colors['--background-tertiary'] : colors['--background-default'],
                },]}
              onFocus={() => { onFocusingHeader(true); }}
              onBlur={() => { onFocusingHeader(false); }}
              onChangeText={onChangeText}
              // onKeyPress={onStartingWrite}
              // onEndEditing={(!isDuplicateHead)?onFinishedEditHead:noUpdate}
              onEndEditing={onFinishedEditHead}
              placeholder={noteEditor.head === "" || noteEditor.head === null ? "Unnamed Note " + noteEditor.note_id : noteEditor.head}
              placeholderTextColor={colors['--foreground-tertiary']}
              value={headerValue}
              editable={editable }
            />

            {/*Header End*/}

            {/*Notes Edit Start*/}


            <ScrollView
              onLayout={handleScrollViewLayout}
              style={[{ height:'100%' , backgroundColor: 'gray'},styles.notesEditStyle, styles.inputAreaColor]}
              ref={scrollViewRef}
              onScroll={handleScroll}
              onScrollEndDrag={handleScrollEnd}
              scrollEventThrottle={16}
            >
              <TextInput
                multiline={true}
                contextMenuHidden={true}
                textAlignVertical={'top'}
                onKeyPress={onStartingWrite}
                style={[ styles.inputAreaColor]}
                onChangeText={onChangeNote}
                autoCorrect={false}
                onEndEditing={(!isDuplicateContent())?onFinishedEditContent:noUpdateContent}
                value={noteValue}
                editable={editable}
                scrollEnabled={false}
              />
            </ScrollView>
            {/*Notes Edit End*/}
          </SafeAreaView>
        </KeyboardAvoidingView>

        <View style={[{ width, height:'100%',
          backgroundColor: colors['--background-default'],},styles.notesBox]}>
          <SafeAreaView style={{ flex: 1 }}>
            <NotesMenuEditor isGestureActive={isGestureActive.value} ></NotesMenuEditor>
          </SafeAreaView>
        </View>


      </Animated.View>
    </PanGestureHandler>
  );
};

export default NotesCustomEditor;
