import { oneOfType } from "prop-types";
import React, { useEffect } from "react";
import { FlatList, RefreshControl, SafeAreaView, Text } from "react-native";
import { View } from "react-native-ui-lib";
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

  const onRefresh = ()=>{
    getHeadsFromServer();
  }

  const getHeadsFromServer = () => {
    if (user.sess !== '') {
      console.log(`Notes Menu update: ${userinfo.status}`);
      if (userinfo.status === "success") {
        setRefreshing(true);
        dispatch(getHeads({ userinfo: userinfo, user: user }))
        .then(()=>{
          setRefreshing(false);
        })
        .catch((e) => { 
          setRefreshing(false); 
          console.log("Failue getting heads from server:\n"+e)
        });
      }
    }
  }

  useEffect(() => {
    getHeadsFromServer();
  }, [user]);

  useEffect(()=>{
    console.log("mountin note menu");
  },[]);


  const onSelectNote = (key:string)=> {
    navigation.navigate("NotesEdit",{});
    const selectedHead = selectNoteByKey(noteHead,key);
    console.log(JSON.stringify(selectedHead));
    dispatch(getNote({user:user,note_id:selectedHead.note_id}));
  };

  const NoteItemCell = ({item, ...props}) => {
    console.log("item mounting => " + JSON.stringify(item));

    const itemObj = selectNoteByKey(noteHead, item);
    return (
      <TouchableOpacity
        key={itemObj.key}
        onPress={() => { onSelectNote(itemObj.key) }}
      >
        <View style={[styles.notesListingItemContainer]}>
          <Text style={[styles.normalText]}>{itemObj.head === '' ? 'Unnamed note ' + itemObj.id : itemObj.head}</Text>
          <Text style={[styles.smallText]}> {itemObj.ctime}</Text>
        </View>
      </TouchableOpacity>
      
    );
  } 

  
  const createNewNote = () => {
    if(userinfo.status === 'success'){
      console.log(`dispatched new note`);
      dispatch(newNote({ user: user, noteMsg: new NotesMsg }));
    }
  };

  return (
    <View style={[ styles.noteMenuViewStyle]}>
      <View style={styles.noteMenuContent}>
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
          style={[{}]}
        >
          <FlatList
            data={noteids}
            renderItem={({ item }) => <NoteItemCell item={item} />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          // keyExtractor={item => item.key}
          // extractData={}
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
