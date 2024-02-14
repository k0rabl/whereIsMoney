import React, { FC, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../services/store'
import { theme } from '../../utils/theme'
import { alertActions } from './store'

export const Alert: FC = () => {
  const alertStore = useSelector((s: RootState) => s.alert)
  const dispatch = useDispatch()

  const translateY = useSharedValue(0)

  useEffect(() => {
    if (!alertStore.isVisible) {
      return
    }

    translateY.value = 50

    setTimeout(() => {
      translateY.value = 0
    }, 2000)

    setTimeout(() => {
      dispatch(alertActions.setHide())
    }, 2200)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translateY, alertStore.isVisible])

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(translateY.value * 2) }],
  }))

  return (
    <Animated.View style={[animatedStyles, styles.alert]}>
      <Text style={styles.alertText}>{alertStore.text}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  alert: {
    position: 'absolute',
    top: -50,
    left: 10,
    right: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: theme.colors.blackOpacity,
    zIndex: 100,
  },
  alertText: {
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.white,
  },
})
