import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const Header = () => {
  return (
    <View style={styles.header}>
        <StatusBar barStyle={"default"}/>
      <View style={styles.headerContent}>
        {/* left */}
        <View>
            <MaterialCommunityIcons name='book-open-page-variant' size={24} color={"#e3e3e3"} />
        </View>
        {/* right */}
        <View>
            <Text style={styles.counter}>3 total</Text>
        </View>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'green',
        paddingTop: StatusBar.currentHeight || 24,
        paddingHorizontal: 12,
        paddingBottom: 5,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    counter: {
        fontSize: 12,
        fontWeight: "black",
        color: '#e3e3e3'
    }
})