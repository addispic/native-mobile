import React from 'react'
import {Provider} from 'react-redux'
import { View,StyleSheet } from 'react-native'
import { Stack } from 'expo-router'

// store
import { store } from '../store'
// components
import Header from '../components/Header'

const RootLayout = () => {
  return (
    <Provider store={store}>
    <View style={styles.container}>
        <Header />
      <Stack>
        <Stack.Screen name='index' options={{
            headerShown: false
        }} />
      </Stack>
    </View>
    </Provider>
  )
}

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default RootLayout