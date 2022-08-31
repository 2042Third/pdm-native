import { oneOfType } from "prop-types";
import React, { useCallback, useEffect } from "react";
import {  FlatList, Modal, Pressable, RefreshControl, SafeAreaView, Text } from "react-native";
import { ActionSheet, View } from "react-native-ui-lib";
import { shallowEqual, useSelector } from "react-redux";
import { styles } from "../../../assets/Style";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";
import { getNote } from "../../handle/redux/reducers/notes/noteEditor";
import { getHeads,  newHeads, newNote, selectNoteByKey } from "../../handle/redux/reducers/notes/notesHeadsReducer";
import { NoteHead, NoteHeadList, NotesMsg } from "../../handle/types";
import Icon from "../../icons/Icon";
import * as RootNavigation from "../../platform/RootNavigation";

import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
const NotesMenu = ({  }) => {
  // const NotesMenu = ({navigation}) => {
  const dispatch = useAppDispatch();
  const userinfo = useAppSelector(state => state.userinfo);
  const user = useAppSelector(state => state.userEnter);
  const noteHead = useAppSelector(state => state.noteHeads);
  const navigation = useNavigation();

  const selectNoteId = (state: { noteHeads: { heads: NoteHead[]; }; }) => state.noteHeads.heads.map((head) => head.key);
  const noteids = useSelector(selectNoteId, shallowEqual);

  const [refreshing, setRefreshing] = React.useState(false);
  const [noteOptionsMenu, setNoteOptionsMenu] = React.useState(false);

  useEffect(() => {
    getHeadsFromServer();
  }, [user]);

  useEffect(() => {
    console.log("mountin note menu");
  }, []);

  const onRefresh = ()=>{
    getHeadsFromServer();
  }

  const onSelectNote = (key: string) => {
    navigation.navigate("NotesEdit", {});
    const selectedHead = selectNoteByKey(noteHead, key);
    console.log(JSON.stringify(selectedHead));
    dispatch(getNote({ user: user, note_id: selectedHead.note_id }));
  };

  const onLongPressNote = (key: string) => {
    console.log(`Long press note item ${key}`);
    setNoteOptionsMenu(true);
  };

  const createNewNote = () => {
    if (userinfo.status === 'success') {
      console.log(`dispatched new note`);
      dispatch(newNote({ user: user, noteMsg: new NotesMsg }));
    }
  };

  const pickNoteOption = (option:string) => {
    console.log("picked note option "+option);
  };

  const getHeadsFromServer = () => {
    if (user.sess !== '') {
      console.log(`Notes Menu update: ${userinfo.status}`);
      if (userinfo.status === "success") {
        setRefreshing(true);
        dispatch(getHeads({ userinfo: userinfo, user: user }))
          .then(() => {
            setRefreshing(false);
          })
          .catch((e) => {
            setRefreshing(false);
            console.log("Failue getting heads from server:\n" + e)
          });
      }
    }
  }

//   class NoteItemCell extends React.PureComponent {
  
//   item = this.props.item;
//   render(){
//     const itemObj = selectNoteByKey(noteHead, this.item);
//     console.log("item mounting => " + JSON.stringify(this.item));
//     return (
//       <View
//         key={itemObj.key}
//         style={[{ flexDirection: "row", justifyContent: 'space-between' }]}
//         >

//         <TouchableOpacity
//           style={[{}]}
//           onPress={() => { onSelectNote(itemObj.key) }}

//         >
//           {/* <View style={[styles.notesListingItemContainer]}> */}
//           <Text style={[styles.normalText]}
//           >
//             {itemObj.head === '' ? 'Unnamed note ' + itemObj.id : itemObj.head}
//           </Text>
//           <Text style={[styles.smallText]}>
//             {itemObj.ctime}
//           </Text>
//           {/* </View> */}
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[{ width: 40, }]}
//           onPress={() => { onLongPressNote(itemObj.key) }}
//         >
//           <Icon style={[styles.menuButton]}
//             name={'dots-vertical'} size={30}
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   }
// } 
  const _renderItem = ({ item }) => (
    // React.memo(NoteItemCell(item ))
    <NoteItemCell item={item}/>
  );
  const NoteItemCell = ({item}) => {
    console.log("item mounting => " + JSON.stringify(item));

    const itemObj = selectNoteByKey(noteHead, item);
    return (
      <View 
        key={itemObj.key}
        style={[{  flexDirection: "row", justifyContent: 'space-between' }]}>

        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 }
          ]}
          onPress={() => { onSelectNote(itemObj.key) }}
        >
          <View style={[styles.notesListingItemContainer]}
          // onPress={({itemObj}) =>  onSelectNote(itemObj.key) }
          >
            <Text style={[styles.normalText]}
            >
              {itemObj.head === '' ? 'Unnamed note ' + itemObj.id : itemObj.head}
            </Text>
            <Text style={[styles.smallText]}> 
              {itemObj.ctime}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {width:40, opacity: pressed ? 0.5 : 1.0 }
          ]}
          onPress={() => { onLongPressNote(itemObj.key) }}
        >
          <Icon style={[styles.menuButton]}
            name={'dots-vertical'} size={30}
          />
        </Pressable>
      </View>
    );
  }

  const noteItemKeyExtractor = useCallback((item) => item,[]);

  return (
    <View style={[ styles.noteMenuViewStyle]}>
      
      <View style={styles.noteMenuContent}>
        <ActionSheet
          title={'Title'}
          message={'Message of action sheet'}
          cancelButtonIndex={3}
          destructiveButtonIndex={0}
          options={[
            { label: 'option 1', onPress: () => pickNoteOption('option 1') },
            { label: 'option 2', onPress: () => pickNoteOption('option 2') },
            { label: 'option 3', onPress: () => pickNoteOption('option 3') },
            { label: 'cancel', onPress: () => pickNoteOption('cancel') }
          ]}
          visible={noteOptionsMenu}
          useNativeIOS
          onDismiss={() => setNoteOptionsMenu( false )}
        />
        <TouchableOpacity
          style={[
            styles.lightContainerColor,
            styles.centerTextContainer,
            ]}
          onPress={createNewNote}
        >
          <Icon style={[styles.menuButton]}
            name={'playlist-plus'} size={30}
          />
          <Text style={[styles.normalText]}>New Note</Text>
        </TouchableOpacity>
        <View
          style={[{height:600}]}
        >
          <FlatList
            data={noteids}
            renderItem={NoteItemCell }
            maxToRenderPerBatch={6}
            windowSize={2}
            initialNumToRender={12}
            // renderItem={({ item }) => <NoteItemCell item={item} />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            removeClippedSubviews={true}
            keyExtractor={noteItemKeyExtractor}
            extraData={noteids}
          >
          </FlatList>
        </View>
        {/* <NoteItem noteids={noteids}></NoteItem> */}
      </View>
    </View>
  )
}
// export default NotesMenu;
export default React.memo(NotesMenu);
function render() {
  throw new Error("Function not implemented.");
}

