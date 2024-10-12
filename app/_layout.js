import {Provider} from 'react-redux'
import { View,StyleSheet } from 'react-native'
import {Stack} from 'expo-router'
import axios from 'axios'

// store
import {store} from '../store'
// components
// header
import Header from '../components/Header'

// configs
axios.defaults.baseURL = "http://192.168.100.156:5000"
axios.defaults.withCredentials = true

const RootLayout = () => {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Header />
      <Stack screenOptions={{
        headerShown: false,
        animation: 'none'
      }}>
        <Stack.Screen name='index' options={{}} />
        <Stack.Screen name='profile' options={{}} />
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