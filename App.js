import { ModalPortal } from 'react-native-modals';
import { Provider } from 'react-redux';
import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { StyleSheet } from 'react-native';
import { UserProvider } from './UserContext.js';
import { decode } from "base-64";
import store from './store';

global.atob = decode;

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <>
          <StackNavigator />
          <ModalPortal />
        </>
      </UserProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
