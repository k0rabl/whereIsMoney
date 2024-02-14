import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { LoginScreen } from '../auth/screen-login'
import { RegistartionScreen } from '../auth/screen-registration'
import { HomeScreen } from '../home/screen'
import { RootState } from '../services/store'
import { RootStackParamList } from './model'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AuthWrapper: FC = () => {
  const userId = useSelector((s: RootState) => s.auth.user?.id)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userId?.length ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistartionScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
