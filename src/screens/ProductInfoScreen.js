import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, ImageBackground, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from "@react-navigation/native";

import Divider from '../components/Divider';
import { addToCart } from '../redux/CartReducer.redux';
import { offers } from '../constants/StaticList';

const ProductInfoScreen = () => {
    const route = useRoute();
    const { width } = Dimensions.get('window');
    const navigation = useNavigation();
    const height = (width * 100) / 100;
    const [addedToCart, setAddedToCart] = useState(false);

    const dispatch = useDispatch();
    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => { setAddedToCart(false) }, 10000)
    }
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <StatusBar backgroundColor={'#00CED1'} />

            {/* Search Container */}
            <View style={styles.searchCont}>
                <Pressable style={styles.searchBox}>
                    <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
                    <TextInput placeholder="Search Amazon.in" />
                </Pressable>
                <Feather name="mic" size={24} color="black" />
            </View>

            {/* Carousel Images */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {route.params.carouselImages.map((item, index) => (
                    <ImageBackground key={index} style={[styles.carouselImages, { width, height }]} source={{ uri: item }} >

                        <View style={styles.offerContainer}>
                            {/* Offer Badge */}
                            <View style={styles.offerCircle}>
                                <Text style={styles.offerTxt}>20% off</Text>
                            </View>

                            {/* Share Button */}
                            <View style={[styles.offerCircle, { backgroundColor: '#E0E0E0' }]}>
                                <MaterialCommunityIcons name="share-variant" size={24} color="black" />
                            </View>
                        </View>

                        <View style={styles.heartContainer}>
                            <AntDesign name="hearto" size={24} color="black" />
                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>

            {/* Price Description */}
            <View style={{ padding: 10 }}>
                <Text style={styles.productDesc}>{route.params.title}</Text>
                <Text style={styles.productPrice}>₹{route.params.price}</Text>
            </View>

            <Divider borderWidth={1} marginTop={0} />

            {/* Color Selector */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10
            }}>
                <Text>Color: </Text>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                }} >{route.params.color}</Text>
            </View>

            {/* Size Selector */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10
            }}>
                <Text>Size: </Text>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold'
                }} >{route.params.size}</Text>
            </View>

            <Divider borderWidth={1} marginTop={0} />

            {/* Total Price & Delivery Address */}
            <View style={{
                padding: 10,
            }}>
                <Text style={styles.totalPriceTxt} >Total Price: ₹{route.params.price}</Text>
                <Text>FREE delivery Tomorrow by 3 PM. Order within 10hrs 30 mins</Text>

                <View style={styles.locationContainer}>
                    <Ionicons name="location" size={24} color="black" />
                    <Text style={styles.addressTxt}>Deliver to Atul - Belkheda, Jabalpur</Text>
                </View>
            </View>

            {/* Stock */}
            <Text style={styles.stockTxt}>IN Stock</Text>

            {/* Add to Cart Button */}
            <Pressable
                onPress={() => addItemToCart(route.params.item)}
                style={styles.cartBtn}>
                {addedToCart ? (
                    <Text>Added to Cart</Text>
                ) : (
                    <Text>Add to Cart</Text>
                )}
            </Pressable>

            {/* Buy Now Button */}
            <Pressable style={[
                styles.cartBtn,
                { backgroundColor: '#FFAC1C' }]}>
                <Text>Buy Now</Text>
            </Pressable>
        </ScrollView>
    )
}

export default ProductInfoScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
        flex: 1,
        backgroundColor: 'white'
    },
    searchCont: {
        backgroundColor: '#00CED1',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBox: {
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 7,
        gap: 10,
        backgroundColor: 'white',
        borderRadius: 3,
        height: 38,
        flex: 1,
    },
    carouselImages: {
        marginTop: 25,
        resizeMode: 'contain',
    },
    offerContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    offerCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#C60C30',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    offerTxt: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 12,
    },
    heartContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 20,
        marginLeft: 20,
        flexDirection: 'row',
    },
    productDesc: {
        fontSize: 15,
        fontWeight: '500'
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 6
    },
    totalPriceTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#00CED1'
    },
    locationContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        gap: 5,
    },
    addressTxt: {
        fontSize: 15,
        fontWeight: '500',
    },
    stockTxt: {
        color: 'green',
        marginHorizontal: 10,
        fontWeight: '500'
    },
    cartBtn: {
        backgroundColor: '#FFC72C',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
})