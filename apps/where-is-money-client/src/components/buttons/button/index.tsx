import React, { FC } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { MiniLoader } from '../../../components/loaders/miniLoader'
import { theme } from '../../../utils/theme'

export interface IButton {
  label: string
  handlePress: () => void
  isLoading?: boolean
  isSecondary?: boolean
  style?: ViewStyle
}

export const Button: FC<IButton> = ({
  label,
  handlePress,
  isSecondary,
  isLoading,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, isSecondary && styles.buttonSecondary, style]}
      onPress={handlePress}>
      {label && !isLoading && <Text style={styles.buttonText}>{label}</Text>}

      {isLoading && (
        <View style={styles.loader}>
          <MiniLoader color={theme.colors.white} count={3} />
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 66,
    backgroundColor: theme.colors.main,
    paddingHorizontal: 23,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: theme.colors.second,
  },

  buttonText: {
    color: theme.colors.white,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '700',
  },

  loader: {
    height: 26,
  },
})
