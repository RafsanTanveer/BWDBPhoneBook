import { View, Text } from 'react-native'
import React from 'react'

const TestData = ({ testD }) => {
    
  return (
      <View>
          {testD.map((item) => (
              <Text >{item[0]}</Text>
          ))}
      </View>
  )
}

export default TestData