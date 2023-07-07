import React, { useCallback, useEffect } from "react";
import { FlatList, Keyboard, Pressable, RefreshControl, Text } from "react-native";
import { ActionSheet, View } from "react-native-ui-lib";
import { colors, styles } from "../../../assets/Style";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";
import { getNote } from "../../handle/redux/reducers/notes/noteEditor";
import { deleteNote, getHeads, newNote, selectNoteByKey } from "../../handle/redux/reducers/notes/notesHeadsReducer";
import { NoteHead, NotesMsg } from "../../handle/types";
import Icon from "../../icons/Icon";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { changePageOpened } from "../../handle/redux/reducers/settings/appSettings";
import { useDrawerStatus } from "@react-navigation/drawer";
import { NoteSortingTypes, updateNotesSorting } from "../../handle/redux/reducers/notes/notesMenuReducer";
import { getSortedNotes } from "../../handle/redux/selectors/selectorNoteHeads";

const NotesMenu = ({  }) => {
  // const NotesMenu = ({navigation}) => {
  const dispatch = useAppDispatch();
  const userinfo = useAppSelector(state => state.userinfo);
  const user = useAppSelector(state => state.userEnter);
  const noteHead = useAppSelector(state => state.noteHeads);
  const navigation = useNavigation();
  const noteids = useAppSelector(state=>getSortedNotes(state));

  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState('');
  const [noteOptionsMenu, setNoteOptionsMenu] = React.useState(false);
  const [sortOpetionMenu, setSortOptionsMenu] = React.useState(false);

  // Debug
  useEffect(()=>{
      console.log("NOTE COMPONENT RECEIVES => "+JSON.stringify(noteids));
    }, [noteids]);

  useEffect(() => {
    getHeadsFromServer();
  }, [user]);

  const isDrawerOpen = useDrawerStatus();

  useEffect(()=>{
    if(isDrawerOpen === "open" ){
      Keyboard.dismiss();
    }
  },[isDrawerOpen]);

  const onRefresh = ()=>{
    getHeadsFromServer();
  }

  useFocusEffect(
    React.useCallback(() => {
      dispatch(changePageOpened("Notes"));
      return () => {
      };
    }, [])
  );

  const onSelectNote = (key: string) => {
    navigation.navigate("NotesEdit", {});
    const selectedHead = selectNoteByKey(noteHead, key);
    console.log(JSON.stringify(selectedHead));
    dispatch(getNote({ user: user, note_id: selectedHead.note_id }));
  };

  const setSortOption = (option: NoteSortingTypes) => {
    dispatch(updateNotesSorting(option))
  }
  const onSetSortOptionMenu = () => {
    setSortOptionsMenu(true);
  };

  const onLongPressNote = (key: string) => {
    console.log(`Long press note item ${key}`);
    setSelectedNote(key);
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
    const selectedHead = selectNoteByKey(noteHead, selectedNote);
    if(option === "delete")
      dispatch(deleteNote({ user: user, noteMsg: selectedHead }));
  };

  const getHeadsFromServer = () => {
    if (user.sess !== '') {
      // console.log(`Notes Menu update: ${userinfo.status}`);
      if (userinfo.status === "success") {
        setRefreshing(true);
        dispatch(getHeads({ userinfo: userinfo, user: user }))
          .then(() => {
            setRefreshing(false);
          })
          .catch((e) => {
            setRefreshing(false);
            // console.log("Failue getting heads from server:\n" + e)
          });
      }
    }
  }

  const NoteItemCell = ({item}) => {
    const itemObj = selectNoteByKey(noteHead, item);
    return (
      <View
        key={itemObj.key}
        style={[{  flexDirection: "row",flex:1, justifyContent: 'space-between' }]}>
        <Pressable
          style={({ pressed }) => [{ flexGrow:1,opacity: pressed ? 0.5 : 1.0 }]}
          onPress={() => { onSelectNote(itemObj.key) }}
          onLongPress={() => { onLongPressNote(itemObj.key) }}
          >
          <View style={[styles.notesListingItemContainer, {flexDirection:"column",alignSelf:"stretch"}]}>
            <Text style={[styles.normalText]}>
              {itemObj.head === '' ? 'Unnamed note ' + itemObj.id : itemObj.head}
            </Text>
            <Text style={[styles.smallText]}>
              {itemObj.ctime}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [{ width: 40, opacity: pressed ? 0.5 : 1.0, flexShrink: 1 }]}
          onPress={() => { onLongPressNote(itemObj.key) }}
        >
          <Icon style={[styles.menuButton, {color:colors['--foreground-default']}]}
            name={'dots-vertical'} size={30}
          />
        </Pressable>
      </View>
    );
  }

  const noteItemKeyExtractor = useCallback((item) => item,[]);

  useEffect(()=>{
    console.log(`Note menu rerender: ${noteids}`);
  },[noteids]);
  return (
    <View style={[ styles.noteMenuViewStyle]}>

      <View style={styles.noteMenuContent}>
        <ActionSheet
          title={selectedNote}
          message={`Note: #${selectedNote}`}
          cancelButtonIndex={1}
          style={[styles.mainColor]}
          destructiveButtonIndex={0}
          options={[
            { label: 'Delete', onPress: () => pickNoteOption('delete') },
            {label: 'Cancel', onPress: () => console.log('cancel')}
          ]}
          visible={noteOptionsMenu}
          useNativeIOS
          // showCancelButton
          onDismiss={() => setNoteOptionsMenu( false )}
        />
        <ActionSheet
          title={'Sort'}
          message={'Select sorting option'}
          cancelButtonIndex={4}
          // containerStyle={[styles.mainColor]}
          // ViewStyle={[styles.mainColor]}
          destructiveButtonIndex={0}
          options={[
            { label: 'by default', onPress: () => setSortOption(NoteSortingTypes.SORT_BY_ID) },
            { label: 'by time created', onPress: () => setSortOption(NoteSortingTypes.SORT_BY_CREATE_TIME) },
            { label: 'by time updated', onPress: () => setSortOption(NoteSortingTypes.SORT_BY_UPDATE_TIME) },
            { label: 'by name', onPress: () => setSortOption(NoteSortingTypes.SORT_BY_NAME) },
            {label: 'Cancel', onPress: () => console.log('cancel')}
          ]}
          visible={sortOpetionMenu}
          useNativeIOS
          // showCancelButton
          onDismiss={() => setSortOptionsMenu( false )}
        />
        <TouchableOpacity
          style={[
            styles.lightContainerColor,
            styles.centerTextContainer,
          ]}
          onPress={createNewNote}
        >
          <Icon style={[styles.menuButton, {color:colors['--foreground-default']}]}
                name={'playlist-plus'} size={30}
          />
          <Text style={[styles.normalText]}>New Note</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.lightContainerColor,
            styles.centerTextContainer,
          ]}
          onPress={onSetSortOptionMenu}
        >
          <Icon style={[styles.menuButton,
            {color:colors['--foreground-default']}]}
                name={'sort'} size={30}
          />
        </TouchableOpacity>
        <View
          style={[{height:600}]}
        >
          <FlatList
            data={noteids}
            renderItem={NoteItemCell }
            maxToRenderPerBatch={20}
            windowSize={3}
            initialNumToRender={20}
            // renderItem={({ item }) => <NoteItemCell item={item} />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            // removeClippedSubviews={true}
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
export default NotesMenu;
// export default React.memo(NotesMenu);
// function render() {
//   throw new Error("Function not implemented.");
// }

