import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';

import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarLabelStyle: { color: '#008E97' },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="home" size={24} color="#008E97" />
                        ) : (
                            <AntDesign name="home" size={24} color="black" />
                        ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarLabelStyle: { color: '#008E97' },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialIcons name="person" size={24} color="#008E97" />
                        ) : (
                            <MaterialIcons name="person-outline" size={24} color="black" />
                        ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarLabel: "Cart",
                    tabBarLabelStyle: { color: '#008E97' },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="cart" size={24} color="#008E97" />
                        ) : (
                            <Ionicons name="cart-outline" size={24} color="black" />
                        ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
