import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native'
import {MaterialIcons, FontAwesome, Entypo, AntDesign} from '@expo/vector-icons'

// slices
// notes 
import {notesSelector,getAllNotes} from '../features/notesSlice'


const Home = () => {
  // hooks
  // dispatch
  const dispatch = useDispatch()
  // states
  // local states
  const [text,setText] = useState('')
  // states from slices
  // notes
  const notes = useSelector(notesSelector)

  // list item
  const noteItem = ({item}) => {
    return (
      <View style={styles.noteItem}>
        {/* text */}
        <View>
          <Text>
            Menilek’s father was Haile Malakot, later negus (king) of Shewa. His
            mother was a court servant who married Haile Malakot shortly after
            Sahle Mariam was born. His forefathers had been rulers of Menz, the
            heartland of Shewa, since the 17th century, and it has been claimed
            that further back they were related to the Solomonid line of
            emperors who ruled Ethiopia between 1268 and 1854 (alternate dates
            1270–1855).
          </Text>
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <Entypo name='clock' size={14} color={'green'}/>
          <Text style={{fontSize: 10, color: 'green'}}>3 minutes ago</Text>
          <TouchableOpacity style={{marginLeft: 12}}>
            <AntDesign name='delete' size={16} color={'red'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // add new note handler
  const addNewNoteHandler = () => {
    if(text.trim()){
      console.log({text})
    }
    setText("")
  }

  // effects
  // get all notes
  useEffect(()=>{
    dispatch(getAllNotes())
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.notesList}>
        <FlatList showsVerticalScrollIndicator={false} data={notes} keyExtractor={(item)=>item._id} renderItem={noteItem}/>
      </View>
      {/* add new note */}
      <View style={styles.addNewNote}>
        {/* file picker */}
        <TouchableOpacity>
          <MaterialIcons name="attach-file" size={26} color={"green"} />
        </TouchableOpacity>
        {/* text input */}
        <View style={styles.textInput}>
          <TextInput value={text} onChangeText={setText} multiline selectionColor={"green"} placeholder="note..." />
        </View>
        {/* send button */}
        <TouchableOpacity onPress={addNewNoteHandler}>
          <FontAwesome name="send-o" size={26} color={"green"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notesList: {
    flex: 1,
    paddingHorizontal: 7,
    paddingTop: 5,
  },
  // note item
  noteItem: {
    marginBottom: 12,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: .3,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 5,
    borderCurve: 'continuous'

  },
  footer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  // add new note
  addNewNote: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
  },
  textInput: {
    flex: 1,
    borderRadius: 3,
    borderCurve: 'continuous',
    borderColor: 'green',
    borderWidth: 1,
    paddingHorizontal: 5,
  }
})