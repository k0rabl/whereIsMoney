import AsyncStorage from '@react-native-async-storage/async-storage'

const LOCAL_STORAGE_NAME = 'token'

export const setToken = async (token: string) => {
  try {
    if (await getToken()) {
      await removeToken()
    }

    await AsyncStorage.setItem(LOCAL_STORAGE_NAME, token)
  } catch (error) {
    console.log(error)
  }
}

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(LOCAL_STORAGE_NAME)
  } catch (error) {
    console.log(error)
  }
}

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(LOCAL_STORAGE_NAME)
  } catch (error) {
    console.log(error)
  }
}
