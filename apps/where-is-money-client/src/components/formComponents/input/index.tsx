import React, { FC, useMemo, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { theme } from '../../../utils/theme'
import { InputIcon } from './icon'

export type InputData = {
  name: string
  value: string
}

export interface IInput extends TextInputProps {
  handleChange: (data: InputData) => void
  style?: ViewStyle
  icons?: {
    side: 'left' | 'right'
    image: React.ReactNode
  }[]
  name: string
  error?: string
  validation?: RegExp
}

export const Input: FC<IInput> = ({
  handleChange,
  icons,
  style,
  name,
  error,
  ...props
}) => {
  const refInput = React.useRef<TextInput>(null)

  const [isFocused, setFocused] = useState(false)
  const LeftIcon = useMemo(() => {
    if (!icons) {
      return null
    }

    return icons.find(e => e.side === 'left')?.image || null
  }, [icons])

  const rightIcon = useMemo(() => {
    if (!icons) {
      return null
    }

    return icons.find(e => e.side === 'right')?.image || null
  }, [icons])

  const onChangeText: (value: string) => void = value => {
    handleChange({ name, value })
  }

  const handleClear: () => void = () => {
    handleChange({ name, value: '' })
  }

  const handlePressContainer: () => void = () => {
    refInput.current?.focus()
  }

  const inputStyle = [
    styles.container,
    !!error && !!error.length && styles.containerError,
    isFocused && styles.containerActive,
  ]

  return (
    <View style={style}>
      <Pressable style={inputStyle} onPress={handlePressContainer}>
        {LeftIcon && (
          <TouchableOpacity style={styles.icon}>{LeftIcon}</TouchableOpacity>
        )}

        <TextInput
          ref={refInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={onChangeText}
          style={styles.input}
          {...props}
        />

        <View style={styles.icon}>
          {rightIcon}

          {!rightIcon && !!props.value && isFocused && !!props.value.length && (
            <TouchableOpacity onPress={handleClear}>
              <InputIcon
                tintColor={theme.colors.main}
                source={require('../../../assets/images/cross.png')}
              />
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
      {!!error && !!error.length && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 66,

    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.gray,
    borderRadius: 16,
    paddingHorizontal: 10,
    transition: 'all .3s',
  },
  containerActive: {
    borderColor: theme.colors.main,
    transition: 'all .3s',
  },
  containerError: {
    borderColor: theme.colors.red,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 23,
  },
  icon: {
    marginLeft: 5,
  },

  error: {
    marginTop: 5,
  },
  errorText: {
    fontSize: 13,
    lineHeight: 16,
    color: theme.colors.red,
  },
})
