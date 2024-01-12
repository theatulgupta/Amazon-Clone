import { Alert, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useEffect, useState } from 'react'

import { API_URL } from '../constants/Api';
import Colors from '../constants/Colors'
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const passwordMatchError = password !== '' && confirmPassword !== '' && password !== confirmPassword
        ? "Passwords don't match"
        : '';

    useEffect(() => { }, [password, confirmPassword]);

    const navigation = useNavigation();

    const handleRegister = async () => {
        try {
            const { data } = await axios.post(`${API_URL}/users/register`, { name, email, password });

            console.log(data);
            Alert.alert('Registration Successful', 'You have registered successfully 🙂');
            clearInputs();
        } catch (error) {
            console.error(error);
            Alert.alert('Registration Failed', 'Something went wrong 😞');
        }
    };

    const clearInputs = () => {
        setName('');
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

                <Text style={styles.headerTxt}>Create an Account,</Text>

                <View style={styles.inputBox}>
                    <MaterialIcons name="person" size={24} style={styles.icon} />
                    <TextInput
                        placeholder='Type your name'
                        value={name}
                        onChangeText={text => setName(text)}
                        style={styles.inputTxt}
                    />
                </View>

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

                <View style={styles.inputBox}>
                    <MaterialIcons name="lock" size={24} style={styles.icon} />
                    <TextInput
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={text => {
                            setConfirmPassword(text)
                        }}
                        style={styles.inputTxt}
                    />
                </View>

                {passwordMatchError !== '' && <Text style={{ color: 'red' }}>{passwordMatchError}</Text>}

                <Pressable
                    style={({ pressed }) => [
                        styles.signUpBtn,
                        { opacity: pressed ? 0.5 : 1 },
                        passwordMatchError !== '' && { backgroundColor: 'grey' }, // Change the background color when passwords don't match
                    ]}
                    onPress={handleRegister}
                    disabled={passwordMatchError !== ''} // Disable the button when passwords don't match
                >
                    <Text style={styles.signUpTxt}>Sign Up</Text>
                </Pressable>

                <Pressable
                    style={styles.haveAccTxt}
                    onPress={() => navigation.goBack()}>
                    <Text>Already have an account?</Text>
                    <Text style={styles.forgotTxt}>{' '}Login</Text>
                </Pressable>

            </KeyboardAvoidingView>
        </SafeAreaView >
    )
};

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
        marginTop: 30,
    },
    icon: {
        marginLeft: 10,
        color: 'gray',
    },
    inputTxt: {
        color: Colors.text,
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
    signUpBtn: {
        width: 200,
        padding: 15,
        backgroundColor: Colors.button,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 6,
        marginTop: 70
    },
    signUpTxt: {
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 16,
        color: Colors.white,
    },
    haveAccTxt: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        color: Colors.text,
    },
})