import { View, Text } from 'react-native'
import React from 'react'

const TestDataRender = ({testData}) => {
  return (
    <View>
          {testData.map((item) => (
              <Text>{item.title}</Text>
          ))}
    </View>
  )
}

export default TestDataRender