import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Link } from 'expo-router'
import {MaterialCommunityIcons, AntDesign} from '@expo/vector-icons'

const Header = () => {
  return (
    <View style={styles.header}>
        <StatusBar barStyle={"default"}/>
      <View style={styles.headerContent}>
        {/* left */}
        <View>
          <Link href={"/"}>
            <MaterialCommunityIcons name='book-open-page-variant' size={24} color={"#e3e3e3"} />
          </Link>
        </View>
        {/* right */}
        <View>
            <Link href={"/profile"}>
            <AntDesign name='user' size={24} color={"#e3e3e3"} />
            </Link>
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