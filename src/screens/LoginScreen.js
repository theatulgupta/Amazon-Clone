import { Alert, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useEffect, useState } from 'react'

import { API_URL } from '../constants/Api';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../constants/Colors'
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                navigation.replace('Main');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = async () => {
        try {
            const { data } = await axios.post(`${API_URL}/users/login`, { email, password });

            await AsyncStorage.setItem('authToken', data.token);
            navigation.replace('Main');
            clearInputs();
        } catch (error) {
            console.error(error);
            Alert.alert('Login Failed', 'Something went wrong 😞');
        }
    };

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    style={styles.loginImg}
                    source={{
                        uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png'
                    }}
                />
            </View>
            <KeyboardAvoidingView>

                <Text style={styles.headerTxt}>Welcome Again,</Text>

                <View style={styles.inputBox}>
                    <MaterialIcons name="email" size={24} style={styles.icon} />
                    <TextInput
                        placeholder='Email Address'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.inputTxt}
                    />
                </View>

                <View style={styles.inputBox}>
                    <MaterialIcons name="lock" size={24} style={styles.icon} />
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.inputTxt}
                    />
                </View>

                <View style={styles.forgotRow}>
                    <Text>Keep me logged in</Text>
                    <Text style={styles.forgotTxt}>Forgot Password?</Text>
                </View>

                <Pressable
                    onPress={handleLogin}
                    style={styles.loginBtn}>
                    <Text style={styles.loginTxt}>Login</Text>
                </Pressable>

                <Pressable
                    style={styles.noAccTxt}
                    onPress={() => navigation.navigate('Register')}>
                    <Text>Don't have an account?</Text>
                    <Text style={styles.forgotTxt}>{' '}Sign Up</Text>
                </Pressable>

            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
    },
    loginImg: {
        width: 150,
        height: 100,
    },
    headerTxt: {
        fontSize: 30,
        fontWeight: '900',
        marginTop: 12,
        marginBottom: 10,
        color: Colors.text
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#E7E7E7',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30
    },
    icon: {
        marginLeft: 10,
        color: 'gray',
    },
    inputTxt: {
        color: 'gray',
        marginVertical: 10,
        width: '75%',
        fontSize: 16,
    },
    forgotRow: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    forgotTxt: {
        color: Colors.primary,
        fontWeight: 'bold'
    },
    loginBtn: {
        width: 200,
        padding: 15,
        backgroundColor: Colors.button,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 6,
        marginTop: 70
    },
    loginTxt: {
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 16,
        color: Colors.white,
    },
    noAccTxt: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        color: Colors.text,
    },
})