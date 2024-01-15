import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { MaterialIcons } from '@expo/vector-icons';
import { addToCart } from '../redux/CartReducer.redux';
import { useDispatch } from 'react-redux';

const ProductItem = ({ item }) => {
    const [addedToCart, setAddedToCart] = useState(false);

    const dispatch = useDispatch();
    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => { setAddedToCart(false) }, 10000)
    }

    return (
        <Pressable style={styles.productContainer}>
            <Image
                source={{ uri: item?.image }}
                style={styles.productImg} />

            <Text numberOfLines={1} style={styles.productTitle}>{item?.title}</Text>

            <View style={styles.productDesc}>
                <Text style={styles.productPrice}>₹{item?.price}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.productRating}>{item?.rating?.rate}</Text>
                    <MaterialIcons name="star" size={16} color="#FFC72C" />
                    <Text style={{ color: Colors.Text }}> ({item?.rating?.count})</Text>
                </View>
            </View>
            <Pressable
                onPress={() => addItemToCart(item)}
                style={styles.addToCartBtn}>
                {addedToCart ? (
                    <Text>Added to Cart</Text>
                ) : (
                    <Text>Add to Cart</Text>
                )}
            </Pressable>
        </Pressable >
    )
}

export default ProductItem

const styles = StyleSheet.create({
    productImg: {
        width: 140,
        height: 140,
        resizeMode: 'contain'
    },
    productContainer: {
        marginHorizontal: 20,
        marginVertical: 25,
    },
    productDesc: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productTitle: {
        width: 130,
        marginTop: 10,
    },
    productPrice: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    productRating: {
        color: '#FFC72C',
        fontWeight: '700'
    },
    addToCartBtn: {
        backgroundColor: '#FFC72C',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 10,
    }
})