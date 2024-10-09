import React from 'react'
import {useSelector} from 'react-redux'
import { StyleSheet, Text, View , StatusBar} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

// states from slice
// notes slice
import {notesSelector} from '../features/notesSlice'

const Header = () => {

    // states
    // states from slices
    // notes slice
    // notes
    const notes = useSelector(notesSelector)
  return (
    <View style={styles.header}>
      <StatusBar barStyle={"light-content"} backgroundColor={"green"} />
      {/* left */}
      <View>
        <MaterialIcons name="menu-book" size={24} color={"#e8e8e8"} />
      </View>
      {/* right */}
      <View>
        <Text style={styles.counter}>{notes.length} total notes</Text>
      </View>
    </View>
  );
}

export default Header

const styles = StyleSheet.create({
  header: {
    backgroundColor: "green",
    padding: StatusBar.currentHeight || 24,
    paddingHorizontal: 5,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  counter: {
    color: "#e8e8e8",
    fontWeight: 'black',
    fontSize: 12,
  },
});