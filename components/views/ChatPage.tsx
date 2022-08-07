import {
  Button,
  FlatList,
  Keyboard,
  ScrollView,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {styles} from '../../assets/Style';
import React, {useState} from 'react';
import {useSelector, shallowEqual, Provider, useDispatch} from 'react-redux';
import ChatBox from './ChatBox';
import {useRef} from 'react';

export default function ChatView({navigation}) {
  const [chatInputValue, onChangeNote] = React.useState('');
  const [inputBlur, onInputBlur] = React.useState(false);
  const window = useWindowDimensions();
  const dispatch = useDispatch();
  const handleKeyDown = e => {
    // If the user pressed the Enter key:
    const trimmedText = chatInputValue.trim();
    if (e.which === 13 && trimmedText) {
      // Dispatch the "todo added" action with this text
      dispatch({type: 'chat/inputEnter', payload: trimmedText});
      // And clear out the text input
      onChangeNote('');
    }
  };
  const handlePress = e => {
    if (chatInputValue.length === 0) {
      return;
    }
    const trimmedText = chatInputValue.trim();
    dispatch({type: 'chat/inputEnter', payload: trimmedText});
    // And clear out the text input
    onChangeNote('');
  };
  // CHAT DATA
  const [thisFlatlist, setReference] = useState(null);
  // const thisFlatlist:React.MutableRefObject<FlatList> = useRef(null);
  const selectChatIds = state => state.chat.messages.map(chat => chat.id);
  const chatIds = useSelector(selectChatIds, shallowEqual);
  return (
    <View style={[styles.chatMainBox, styles.container]}>
      <FlatList
        style={[styles.chatDisplayBox, styles.inputAreaColor]}
        data={chatIds}
        renderItem={({item}) => <ChatBox key={item} id={item} self={true} />}
        onTouchStart={() => Keyboard.dismiss()}
        ref={ref => {
          setReference(ref);
        }}
        // ref={ref => this.flatList = ref}
        onContentSizeChange={() => thisFlatlist.scrollToEnd({animated: true})}
        onLayout={() => thisFlatlist.scrollToEnd({animated: true})}
      />
      <TextInput
        multiline={true}
        textAlignVertical={'top'}
        style={[styles.chatEditStyle, styles.inputAreaColor]}
        onChangeText={onChangeNote}
        // onKeyDown={handleKeyDown}
        value={chatInputValue}
      />
      <Button title={'Send'} onPress={handlePress} />
    </View>
  );
}
