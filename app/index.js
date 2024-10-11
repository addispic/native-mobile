import React, {useState, useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { StyleSheet, Text, View,TouchableOpacity, TextInput, FlatList } from 'react-native'
import {MaterialIcons, FontAwesome,Entypo} from '@expo/vector-icons'

// config
// socket
import {SOCKET} from '../config'

// slices
// notes
import {getNotes,notesSelector, addNewNote,deleteNote, addNewNoteEvent, deleteNoteEvent} from '../features/notesSlice'

const Home = () => {

  // bottom reference
  const bottomReference = useRef(null)

  // hooks
  // dispatch
  const dispatch = useDispatch()

  // states from slice
  // notes
  const notes = useSelector(notesSelector)

  // local states
  // text
  const [text,setText] = useState("")

  // effects
  // get notes
  useEffect(()=>{
    dispatch(getNotes())
  },[])

  // add new note
  useEffect(()=>{
    SOCKET.on("addNewNoteEvent", note =>  {
      dispatch(addNewNoteEvent(note))
    })
  },[])

  // delete note
  useEffect(()=>{
    SOCKET.on("deleteNoteEvent", _id => {
      dispatch(deleteNoteEvent(_id))
    })
  },[])

  // scroll to bottom
  useEffect(()=>{
    // bottomReference?.current.scrollIntoView({behavior: 'smooth'})
  },[notes])

  // add new text
  const addNewTextHandler = () => {
    if(text.trim()){
      dispatch(addNewNote({text}))
    }
    setText("")
  }

  // render note
  const renderNote = ({item}) => {
    return (
      <View style={styles.noteContainer}>
        {/* text */}
        <View style={styles.noteText}>
          <Text>
          {item.text}
          </Text>
        </View>
        {/* footer */}
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 12}}>
          <Entypo name='clock' size={18} color={'green'} />
          <Text style={{fontSize: 10, color: 'green'}}>3 minutes ago</Text>
          <TouchableOpacity onPress={()=>{
            dispatch(deleteNote(item._id))
          }}>
            <Text style={{marginLeft: 12, fontSize: 12, color: 'red'}}>delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* notes */}
      <View style={styles.noteList}>
      <FlatList showsVerticalScrollIndicator={false} data={notes} key={(item) =>item._id} renderItem={renderNote}/>
      </View>
      <View ref={bottomReference}/>
      {/* add new */}
      <View style={styles.addNewNote}>
        {/* file picker */}
        <TouchableOpacity>
          <MaterialIcons name='attach-file' size={28} color={"green"}/>
        </TouchableOpacity>
        {/* text input */}
        <View style={styles.textInput}>
          <TextInput value={text} onChangeText={setText} multiline selectionColor={"green"} placeholder='text'/>
        </View>
        {/* send button */}
        <TouchableOpacity onPress={addNewTextHandler}>
          <FontAwesome name='send-o' size={24} color={"green"}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noteList: {
    flex: 1,
  },
  addNewNote: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 24,
    paddingVertical: 5,
    gap: 5,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'green',
    paddingHorizontal: 3,
    borderRadius: 5,
    borderCurve: 'continuous'
  },
  noteContainer: {
    marginBottom: 12,
    paddingHorizontal: 12,
    marginTop: 7
  },
  noteText: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 7,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: {width: 0,height: 3},
    shadowOpacity: .3
  }
})