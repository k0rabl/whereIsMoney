import React, { FC } from 'react'
import { Provider } from 'react-redux'

import { Alert } from '../components/alert'
import { store } from '../services/store'
import { AuthWrapper } from './AuthWrapper'

export const App: FC = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Alert />
        <AuthWrapper />
      </Provider>
    </React.StrictMode>
  )
}
