import { AntDesign, Entypo, Feather, Ionicons, MaterialIcons, } from '@expo/vector-icons';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import SearchHeader from '../components/SearchHeader';
import { UserContext } from "../../UserContext";
import { fetchAddresses } from '../constants/Api';

const AddAddressScreen = () => {
    const { userId } = useContext(UserContext);
    const [addresses, setAddresses] = useState([]);
    const navigation = useNavigation();

    const fetchAndSetAddresses = useCallback(() => {
        fetchAddresses({ userId, setAddresses });
    }, [userId]);

    useEffect(() => {
        fetchAndSetAddresses();
    }, [fetchAndSetAddresses]);

    useFocusEffect(fetchAndSetAddresses);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <StatusBar backgroundColor={'#00CED1'} />

            <SearchHeader />

            <View style={{ padding: 10 }}>
                <Text style={styles.addressesTxt}>Your Addresses</Text>
                <Pressable
                    onPress={() => navigation.navigate('AddAddress')}
                    style={styles.addAddressBtn}>
                    <Text>Add a new Address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>

                {/* Pressable to display already addres addresses with all the fields */}
                <Pressable>
                    {addresses?.map((item, index) => (
                        <Pressable
                            key={index}
                            style={styles.addressItemContainer}
                        >
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>{item?.name}</Text>
                                <Entypo name="location-pin" size={24} color="red" />
                            </View>

                            <Text style={styles.addressTxt}>{item?.houseNo}, {item?.landmark}</Text>
                            <Text style={styles.addressTxt}>{item?.street}</Text>
                            <Text style={styles.addressTxt}>{item?.city}</Text>
                            <Text style={styles.addressTxt}>{item?.state}, {item?.pincode}</Text>
                            <Text style={styles.addressTxt}>Phone number: {item?.mobile}</Text>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                                marginTop: 7,
                            }}>
                                <Pressable style={styles.editBtn}>
                                    <Text>Edit</Text>
                                </Pressable>
                                <Pressable style={styles.editBtn}>
                                    <Text>Remove</Text>
                                </Pressable>
                                <Pressable style={styles.editBtn}>
                                    <Text>Set as Default</Text>
                                </Pressable>
                            </View>
                        </Pressable>
                    ))}
                </Pressable>
            </View>

        </ScrollView>
    )
}

export default AddAddressScreen;

const styles = StyleSheet.create({
    addressesTxt: {
        fontSize: 20,
        fontWeight: '600'
    },
    addAddressBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderColor: '#D0D0D0'
    },
    addressItemContainer: {
        borderWidth: 1,
        borderColor: '#D0D0D0',
        padding: 10,
        flexDirection: 'coloumn',
        gap: 5,
        marginTop: 10,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    nameTxt: {
        fontSize: 16,
        fontWeight: '800'
    },
    addressTxt: {
        fontSize: 15,
        color: '#181818',
        fontWeight: '600'
    },
    editBtn: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        borderRadius: 5,
        paddingVertical: 6,
        borderWidth: 0.9,
        borderColor: '#D0D0D0',
    },
});