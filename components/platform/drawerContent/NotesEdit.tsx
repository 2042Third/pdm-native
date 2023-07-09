

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
const { width, height } = Dimensions.get('window');
import { updateEditsContent, updateEditsHead, updateNote } from '../../handle/redux/reducers/notes/noteEditor';
import { updateNotesHeaderInfo } from "../../handle/redux/reducers/notes/notesHeaderInfo";
import { currentNotePage } from "../../handle/redux/reducers/notes/notesMenuReducer";
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
  const [isAnimationActive, setIsAnimationActive] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollViewRef = useRef(null);

  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const noteEditor:NotesMsg = useAppSelector(state => state.noteEditor);
  const noteMenu = useAppSelector(state => state.notesMenu);

  const [headerValue, onChangeText] = React.useState(noteEditor.head);
  const [noteValue, onChangeNote] = React.useState(noteEditor.content);
  const [dirty, onDirty] = React.useState(false);
  const [waitValue, onWaitValue] = React.useState(0);
  const [isFocused, onFocusingHeader] = React.useState(false);
  const dispatch = useAppDispatch();

  const mainNoteTextInputRef = useRef(null);
  const [mainInputFocused,setMainInputFocus] = useState(false);

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
    // console.log(`Note status changed to ${noteEditor.status}`);
    // console.log(`Note status info is ${noteEditor.statusInfo}`);
    // console.log(`ntype noteEditor.statusInfo is ${ noteEditor.ntype}`);
    if(noteEditor.ntype === "retrieve_return" && noteEditor.statusInfo === "fulfilled"){
      handleNavigation("first");
      console.log(`Navigation action triggered`);
    }
    }, [noteEditor.statusInfo]);

  useEffect(() => {
      console.log(`[useEffect->noteMenu.currentNotePage]  currentNotePage = ${noteMenu.currentNotePage}`);
      if (isAnimationActive===0 && isGestureActive.value===0){
        console.log(`[useEffect->noteMenu.currentNotePage] Should have changed the screen to ${noteMenu.currentNotePage}`);
        if (noteMenu.currentNotePage === 0) {
          handleNavigation("first");
        }
        else if (noteMenu.currentNotePage === 1) {
          handleNavigation("second");
        }
      }
      else {
        console.log(`[useEffect->noteMenu.currentNotePage] Animation or gesture is active, not changing the screen`);
      }
    }, [noteMenu.currentNotePage]);

  /**
   * Sets the index of the current screen in redux; it doesn't change the screen.
   * */
  const setCurrentScreen = (index:number ) => {
    dispatch(currentNotePage(index));
  }

  /*
  * Main note editor's scrollView text input touch action.
  * **/
  const onScrollTouch = () => {
    console.log(`onScrollTouch called, focusing to main note text input`);
    if (noteEditor.statusInfo === "rejected" || noteEditor.statusInfo === "none"){ // No note open, goto note list.
      dispatch(currentNotePage(1));
      // Make it blur
      if (mainNoteTextInputRef.current!==null) {
        mainNoteTextInputRef.current.blur();
        console.log(`Focus blurred.`);
      }
      return;
    }
    if (mainInputFocused) {
      console.log(`main note text input is already focused`);
    }
    else {
      console.log(`main note text input is not focused`);
      if (mainNoteTextInputRef.current!==null
        && isGestureActive.value===0
        && velocity.value ===0
      ) {
        mainNoteTextInputRef.current.focus();
        setMainInputFocus(true);
        console.log(`main note text input is focused`);
      }
    }
  }

  useEffect (() => {
    if (!editable){
      if (mainNoteTextInputRef.current!==null) {
        mainNoteTextInputRef.current.blur();
        console.log(`Editable Focus blurred.`);
      }
    }
  }, [editable]);

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

  const mainNoteTextInputFocus = () => {
    console.log(`mainNoteTextInputFocus called, noteEditor.statusInfo=${noteEditor.statusInfo}`);
    if (noteEditor.statusInfo === "rejected" || noteEditor.statusInfo === "none"){ // No note open, goto note list.
      dispatch(currentNotePage(1));
      // Make it blur
      if (mainNoteTextInputRef.current!==null) {
        mainNoteTextInputRef.current.blur();
        console.log(`mainText Focus blurred.`);
      }
    }
  }

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
    console.log(`No update.`)
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


  /**
   * Navigation function that move the screen the position of snapPoint.
   * */
  const navigateTo = (snapPoint:number) => {
    'worklet';

    translateX.value = withSpring(snapPoint, { damping: 10, stiffness: 20, mass: 0.1 }
      , () => {
      runOnJS(setIsAnimationActive)(0);
      // console.log("[withSpring callback] snapping point achieved");
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

    // console.log(`num: ${num}, lowerBound: ${lowerBound}, upperBound: ${upperBound}`);
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
        } else {
          runOnJS(setInitialDirection)('vertical');
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
      // console.log(`[Before Making animation] SnapScreen: ${snapScreen}, currentScreen: ${currentScreen.value} `);
      // console.log(`[Before Making animation] velocityX: ${velocityX}, displacement: ${displacement.value} `);

      if (snapScreen!=currentScreen.value ){ // Just making sure no weird stuff.
        if (displacement.value>=0) {
          if (currentScreen.value===0)
            snapScreen = 0;
          else
            snapScreen=-1*(currentScreen.value-1);
        }
        else{
          if (currentScreen.value===(MAX_SCREENS-1))
            snapScreen = -1*(MAX_SCREENS-1);
          else
            snapScreen=-1*(currentScreen.value+1);
        }
      }
      // console.log(`[Making animation] SnapScreen: ${snapScreen}, currentScreen: ${currentScreen.value} `);

      if (isAnimationActive !== 1) {
        runOnJS(setIsAnimationActive)(1);
        console.log("[Selected] Start Animation");
      }
      currentScreen.value = Math.abs(snapScreen);
      runOnJS(setCurrentScreen)(snapScreen);
      const snapPoint = snapScreen*width;
      navigateTo(snapPoint);
      isGestureActive.value = 0;
      runOnJS(setInitialDirection)('none');

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
              onTouchEnd={()=>{onScrollTouch()}}
            >
              <TextInput
                ref={mainNoteTextInputRef}
                multiline={true}
                contextMenuHidden={false}
                textAlignVertical={'top'}
                onKeyPress={onStartingWrite}
                style={[ styles.inputAreaColor]}
                onChangeText={onChangeNote}
                autoCorrect={false}
                onEndEditing={(!isDuplicateContent())?onFinishedEditContent:noUpdateContent}
                value={noteValue}
                editable={editable}
                scrollEnabled={false}
                onFocus={()=>{mainNoteTextInputFocus()}}
                onBlur={()=>{setMainInputFocus(false)}}
              />
            </ScrollView>
            {/*Notes Edit End*/}
          </SafeAreaView>
        </KeyboardAvoidingView>

        <View style={[{ width, height:'100%',
          backgroundColor: colors['--background-default'],},styles.notesBox]}>
          <SafeAreaView style={{ flex: 1 }}>
            <NotesMenuEditor
              isGestureActive={isGestureActive.value}
              isAnimationActive={isAnimationActive}
              translationX={translateX.value}
              velocityX={velocity.value}
              displacementX={displacement.value}
            ></NotesMenuEditor>
          </SafeAreaView>
        </View>


      </Animated.View>
    </PanGestureHandler>
  );
};

export default NotesCustomEditor;
