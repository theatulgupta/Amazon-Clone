import { Alert, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { addAddress, fetchUser } from '../constants/Api';

import { UserContext } from "../../UserContext";
import { useNavigation } from '@react-navigation/native';

const AddressScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [street, setStreet] = useState('');
    const [landmark, setLandmark] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const { userId } = useContext(UserContext);

    const handleAddAddress = async () => {
        const address = {
            name,
            mobile,
            houseNo,
            street,
            landmark,
            pincode,
            city,
            state,
        };

        const response = await addAddress({ userId, address });

        if (response) {
            Alert.alert('Success', 'Address added successfully');
            clearStates();
            setTimeout(() => {
                navigation.goBack();
            })
        } else {
            Alert.alert('Error', 'Failed to add address');
        }
    };


    const clearStates = () => {
        setName('');
        setMobile('');
        setHouseNo('');
        setStreet('');
        setLandmark('');
        setPincode('');
        setCity('');
        setState('');
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor={'#00CED1'} />

            <View style={styles.dummyHeader} />

            <View style={styles.container}>
                <Text style={styles.addAddressTxt}>Add a new Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder='India'
                    placeholderTextColor={'black'}
                />

                <InputField
                    title="Full name (First and Last name)"
                    value={name}
                    onChangeText={text => setName(text)}
                    maxLength={50}
                />

                <InputField
                    title="Mobile Number"
                    value={mobile}
                    onChangeText={text => setMobile(text)}
                    keyboardType='numeric'
                    maxLength={10}
                    placeholder='10-digit mobile number without prefixes'
                    assistTxt='May be used to assist delivery'
                />

                <InputField
                    title="Flat, House No., Building, Company, Apartment"
                    value={houseNo}
                    onChangeText={text => setHouseNo(text)}
                />

                <InputField
                    title="Area, Street Sector, Village"
                    value={street}
                    onChangeText={text => setStreet(text)}
                />

                <InputField
                    title="Landmark"
                    value={landmark}
                    onChangeText={text => setLandmark(text)}
                    maxLength={50}
                    placeholder='E.g. near Apollo Hospital'
                />

                <InputField
                    title="Pincode"
                    value={pincode}
                    onChangeText={text => setPincode(text)}
                    placeholder='6-digit Pincode'
                    placeholderTextColor={'gray'}
                />

                <InputField
                    title="Town/City"
                    value={city}
                    onChangeText={text => setCity(text)}
                />

                <InputField
                    title="State"
                    value={state}
                    onChangeText={text => setState(text)}
                />

                <Pressable
                    onPress={handleAddAddress}
                    style={styles.addAddressBtn}>
                    <Text style={styles.addAddressBtnTxt}>
                        Add Address
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const InputField = ({ title, value, onChangeText, maxLength, placeholder, placeholderTextColor, assistTxt }) => (
    <View style={{ marginVertical: 10 }}>
        <Text style={styles.inputTitle}>{title}</Text>
        <TextInput
            value={value}
            onChangeText={onChangeText}
            maxLength={maxLength}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
        />
        {assistTxt && <Text style={styles.assistTxt}>{assistTxt}</Text>}
    </View>
);

const styles = StyleSheet.create({
    dummyHeader: {
        height: 38,
        backgroundColor: '#00CED1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 10,
    },
    addAddressTxt: {
        fontSize: 17,
        fontWeight: '600',
    },
    input: {
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#1E1E1E',
    },
    inputTitle: {
        fontSize: 15,
        fontWeight: '600',
    },
    assistTxt: {
        marginTop: 8,
        color: '#1E1E1E',
        fontSize: 12,
    },
    pincodeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
    },
    addAddressBtn: {
        backgroundColor: '#FFC72C',
        padding: 15,
        borderRadius: 6,
        justifyContent: 'center',
        marginTop: 20,
    },
    addAddressBtnTxt: {
        textAlign: 'center',
        fontSize: 16,
    },
});

export default AddressScreen;
