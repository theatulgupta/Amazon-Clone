import { StyleSheet, Text, View } from 'react-native'

import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';
import BottomTabs from './BottomTabNavigator';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import LoginScreen from '../screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import OrderScreen from '../screens/OrderScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
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
                <Stack.Screen
                    name="Info"
                    component={ProductInfoScreen}
                    options={{
                        headerShown: false,
                    }} />
                <Stack.Screen
                    name="Address"
                    component={AddAddressScreen}
                    options={{
                        headerShown: false,
                    }} />
                <Stack.Screen
                    name="AddAddress"
                    component={AddressScreen}
                    options={{
                        headerShown: false,
                    }} />
                <Stack.Screen
                    name="Confirm"
                    component={ConfirmationScreen}
                    options={{
                        headerShown: false,
                    }} />
                <Stack.Screen
                    name="Order"
                    component={OrderScreen}
                    options={{
                        headerShown: false,
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
