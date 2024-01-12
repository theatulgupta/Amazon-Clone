import { StyleSheet, Text, View } from 'react-native'

import BottomTabs from './BottomTabNavigator';
import LoginScreen from '../screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import RegisterScreen from '../screens/RegisterScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export default function StackNavigator() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false
                    }} />

                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{
                        headerShown: false,
                    }} />
                <Stack.Screen
                    name="Main"
                    component={BottomTabs}
                    options={{
                        headerShown: false,
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



const styles = StyleSheet.create({})