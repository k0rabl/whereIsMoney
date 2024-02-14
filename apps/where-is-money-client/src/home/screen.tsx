import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const HomeScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text>TEST</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
})
