import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 1300)
    })
    return (
        <SafeAreaView style={styles.container} >
            <StatusBar backgroundColor={'#00CED1'} />
            <View style={styles.dummyHeader} />
            <LottieView
                source={require('../../assets/json/thumbs.json')}
                style={{
                    height: 260,
                    width: 300,
                    alignSelf: 'center',
                    marginTop: 40,
                    justifyContent: 'center'
                }}
                autoPlay
                loop={false}
                speed={0.7}
            />
            <Text style={{
                marginTop: 20,
                fontSize: 19,
                fontWeight: '600',
                textAlign: 'center',
                padding: 10,
            }}>Your order has been placed successfully</Text>

            <LottieView
                source={require("../../assets/json/sparkle.json")}
                style={{
                    height: 300,
                    position: "absolute",
                    top: 100,
                    width: 300,
                    alignSelf: "center",
                }}
                autoPlay
                loop={false}
                speed={0.7}
            />
        </SafeAreaView>
    )
}

export default OrderScreen;

const styles = StyleSheet.create({
    container: {
        // Give top padding based on the status bar size
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
        flex: 1,
        backgroundColor: 'white',
    },
    dummyHeader: {
        height: 38,
        backgroundColor: '#00CED1',
        justifyContent: 'center',
        alignItems: 'center',
    },
})