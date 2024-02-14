import React, {FC} from 'react'
import {DotIndicator, DotIndicatorProps} from 'react-native-indicators'

export const MiniLoader: FC<DotIndicatorProps> = ({size, ...props}) => {
  return <DotIndicator size={size || 8} {...props} />
}
