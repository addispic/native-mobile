import React, {useState, useEffect, useRef} from 'react'
import { View, Text, ScrollView } from 'react-native'

const Profile = () => {

  const bottomReference = useRef(null)

  useEffect(() => {
    // Scroll to the bottom when the component mounts
    bottomReference.current.scrollToEnd({ animated: true });
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#f2f3f5'}}>
      <ScrollView ref={bottomReference} showsVerticalScrollIndicator={false}>
        {
          [...Array(24)].map((item,index)=>{
            return (
              <View key={index} style={{padding: 12,margin: 24}}>
                <Text>{index+1}. Hello World</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default Profile