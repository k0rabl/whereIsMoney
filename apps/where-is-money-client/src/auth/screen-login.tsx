import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { RootStackParamList } from '../app/model'
import { Button } from '../components/buttons/button'
import { Input, InputData } from '../components/formComponents/input'
import { InputPassword } from '../components/formComponents/inputPassword'
import { RequestType } from '../services/loader'
import { Dispatch } from '../services/store'
import { RootState } from '../services/store'
import { theme } from '../utils/theme'
import { loginUserThunk } from './thunk'

export const LoginScreen: FC = () => {
  const auth = useSelector((s: RootState) => s.auth)
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const dispatch = useDispatch<Dispatch>()
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm()

  useEffect(() => {
    register('email', { required: 'Email Address is required' })
    register('password', { required: 'Pasword is required' })
  }, [register])

  const handleChangeInput = useCallback(
    (data: InputData) => {
      clearErrors(data.name)

      setValue(data.name, data.value)
    },
    [setValue, clearErrors],
  )

  const handleSendForm = useCallback(async () => {
    const result = await trigger()

    if (!result) {
      return
    }

    dispatch(
      loginUserThunk({
        email: watch('email'),
        password: watch('password'),
      }),
    )
  }, [dispatch, trigger, watch])

  const handleSwitch: () => void = () => {
    nav.navigate('Registration')
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
        <Text style={styles.logoText}>Where is Money?</Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter email"
          handleChange={handleChangeInput}
          name="email"
          value={watch('email')}
          error={errors.email?.message as string}
        />

        <InputPassword
          placeholder="Enter password"
          handleChange={handleChangeInput}
          name="password"
          value={watch('password')}
          error={errors.password?.message as string}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Button
          style={styles.button}
          label="Sign In"
          handlePress={handleSendForm}
          isLoading={auth.registrationReqStatus === RequestType.LOADING}
        />
        <View style={styles.registrationContainer}>
          <Text style={styles.registrationText}>Do you want an account?</Text>
          <TouchableOpacity onPress={handleSwitch}>
            <Text style={[styles.registrationText, styles.registrationLink]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 15,
  },

  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  logoText: {
    fontSize: 21,
    fontWeight: '700',
  },

  inputContainer: {
    gap: 10,
    width: '100%',
    marginBottom: 15,
  },

  bottomContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 10,
  },

  registrationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 3,
  },
  registrationText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  registrationLink: {
    color: theme.colors.main,
    fontWeight: '600',
  },
})
