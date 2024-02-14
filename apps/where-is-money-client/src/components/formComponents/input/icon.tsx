import React, {FC} from 'react'
import {Image, ImageProps, StyleSheet} from 'react-native'

export const InputIcon: FC<ImageProps> = ({...props}) => {
  return <Image {...props} style={styles.icon} />
}

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
  },
})
