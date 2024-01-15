import { Provider } from 'react-redux';
import React from 'react'
import StackNavigator from './src/navigation/StackNavigator';
import { StyleSheet } from 'react-native'
import store from './store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})