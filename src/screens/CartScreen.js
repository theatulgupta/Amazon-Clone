import { AntDesign, Feather } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer.redux';
import { useDispatch, useSelector } from 'react-redux';

import Divider from '../components/Divider';
import SearchHeader from '../components/SearchHeader'
import { UserContext } from "../../UserContext";
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
    const navigation = useNavigation();
    const cart = useSelector((state) => state.cart.cart);

    const total = cart?.map((item) => item?.price * item?.quantity)
        .reduce((previous, current) => previous + current, 0);

    const dispatch = useDispatch();
    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item));
    }
    const decreaseQuantity = (item) => {
        if (item?.quantity > 1) {
            dispatch(decrementQuantity(item));
        } else {
            dispatch(removeFromCart(item));
        }
    }

    const deleteFromCart = (item) => {
        dispatch(removeFromCart(item));
    }

    return (
        <ScrollView style={styles.container}>
            <SearchHeader />

            <View style={styles.subtotalContainer}>
                <Text style={styles.subtotalText}>Subtotal:</Text>
                <Text style={styles.totalAmount}> ₹{total}</Text>
            </View>

            <Text style={styles.emiDetailsText}>EMI Details Available</Text>

            <Pressable
                onPress={() => navigation.navigate('Confirm')}
                style={styles.proceedToBuyButton}>
                <Text>Proceed to Buy ({cart?.length}) items</Text>
            </Pressable>

            <Divider borderWidth={1} />

            <View style={{ marginHorizontal: 10 }}>
                {cart?.map((item, index) => (
                    <View key={index} style={styles.container}>
                        <Pressable style={styles.itemContent}>
                            <View>
                                <Image source={{ uri: item?.image }} style={styles.itemImage} />
                            </View>

                            <View>
                                <Text numberOfLines={3} style={styles.itemDetails}>
                                    {item?.title}
                                </Text>
                                <Text style={styles.itemPrice}>₹{item?.price}</Text>
                                <Image source={require('../../assets/images/amazon_prime.png')} style={styles.primeImage} />
                                <Text style={styles.stockText}>In Stock</Text>
                                <Text style={styles.ratingText}>{item?.rating?.rate}⭐</Text>
                            </View>
                        </Pressable>

                        <Pressable style={styles.actionButtons}>
                            <Pressable
                                onPress={() => decreaseQuantity(item)}
                                style={styles.deleteButton}>
                                {item?.quantity > 1 ?
                                    (<Feather name="minus" size={24} color="black" />) :
                                    (<AntDesign name="delete" size={24} color="black" />)}
                            </Pressable>
                            <Pressable style={styles.quantityDisplay}>
                                <Text>{item?.quantity}</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => increaseQuantity(item)}
                                style={styles.increaseQuantityButton}>
                                <Feather name="plus" size={24} color="black" />
                            </Pressable>
                            <Pressable
                                onPress={() => deleteFromCart(item)}
                                style={styles.deleteTextButton}>
                                <Text>Delete</Text>
                            </Pressable>
                        </Pressable>

                        <View style={styles.actionGroup}>
                            <Pressable style={styles.saveForLaterButton}>
                                <Text>Save For Later</Text>
                            </Pressable>
                            <Pressable style={styles.seeMoreButton}>
                                <Text>See More Like this</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
        flex: 1,
        backgroundColor: 'white',
    },
    itemContent: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemImage: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
    },
    itemDetails: {
        width: 150,
        marginTop: 10,
        fontWeight: 'bold',
    },
    itemPrice: {
        marginTop: 6,
        fontSize: 20,
        fontWeight: 'bold',
    },
    primeImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    stockText: {
        color: 'green',
    },
    ratingText: {
        fontWeight: '500',
        marginTop: 6,
    },
    actionButtons: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 7,
    },
    deleteButton: {
        backgroundColor: '#D8D8D8',
        padding: 7,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    quantityDisplay: {
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    increaseQuantityButton: {
        backgroundColor: '#D8D8D8',
        padding: 7,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
    },
    deleteTextButton: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: '#C0C0C0',
        borderWidth: 0.6,
        marginLeft: 20,
    },
    actionGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 15,
    },
    saveForLaterButton: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: '#C0C0C0',
        borderWidth: 0.6,
    },
    seeMoreButton: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: '#C0C0C0',
        borderWidth: 0.6,
    },
    subtotalContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtotalText: {
        fontSize: 18,
        fontWeight: '400',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    emiDetailsText: {
        marginHorizontal: 10,
    },
    proceedToBuyButton: {
        marginHorizontal: 10,
        backgroundColor: '#FFC72C',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
})