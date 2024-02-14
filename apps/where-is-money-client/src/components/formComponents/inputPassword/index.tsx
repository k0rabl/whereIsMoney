import React, { FC, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { theme } from '../../../utils/theme'
import { IInput, Input } from '../input'

const ShowButton: FC<{
  isVisiblePass: boolean
  handleShow: () => void
  isHide: boolean
}> = ({ isVisiblePass, handleShow, isHide }) => {
  return (
    <>
      {isHide ? (
        <TouchableOpacity style={styles.show} onPress={handleShow}>
          <Text style={styles.showText}>{isVisiblePass ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      ) : null}
    </>
  )
}

export const InputPassword: FC<IInput> = ({ ...props }) => {
  const [isVisiblePass, setVisiblePass] = useState(false)

  const handleShow: () => void = () => {
    setVisiblePass(!isVisiblePass)
  }
  return (
    <Input
      secureTextEntry={!isVisiblePass}
      icons={[
        {
          side: 'right',
          image: (
            <ShowButton
              isHide={!!props.value?.length}
              isVisiblePass={isVisiblePass}
              handleShow={handleShow}
            />
          ),
        },
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  show: {},
  showText: {
    fontSize: 21,
    lineHeight: 24,
    fontWeight: '600',
    color: theme.colors.main,
  },
})
