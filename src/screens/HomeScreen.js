import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { categories, deals, images, offers } from '../constants/StaticList.js';

import Divider from '../components/Divider.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform } from 'react-native';
import ProductItem from '../components/ProductItem.js';
import { SliderBox } from 'react-native-image-slider-box';
import { StatusBar } from 'react-native';
import { fetchProducts } from '../constants/Api.js';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('electronics');
    const [items, setItems] = useState([
        { label: "Men's clothing", value: "men's clothing" },
        { label: "jewelery", value: "jewelery" },
        { label: "electronics", value: "electronics" },
        { label: "women's clothing", value: "women's clothing" },
    ]);


    const navigation = useNavigation();

    useEffect(() => {
        fetchProducts(setProducts)
    }, []);

    const cart = useSelector((state) => state.cart.cart);

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar backgroundColor={'#00CED1'} />
            <ScrollView>
                {/* Search Container */}
                <View style={styles.searchCont}>
                    <Pressable style={styles.searchBox}>
                        <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
                        <TextInput placeholder="Search Amazon.in" />
                    </Pressable>
                    <Feather name="mic" size={24} color="black" />
                </View>

                {/* Address Bar */}
                <Pressable style={styles.addressCont}>
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Pressable>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Deliver to Home - Belkheda, Shahpura</Text>
                    </Pressable>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </Pressable>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map((item, index) => (
                        <Pressable key={index} style={styles.categoryItem}>
                            <Image style={styles.categoryImg} source={{ uri: item.image }} />
                            <Text style={styles.categoryTxt}>{item?.name}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Image Slider */}
                <SliderBox
                    images={images}
                    autoPlay
                    circleLoop
                    dotColor="#13274F"
                    inactiveDotColor="#90A4AE"
                    ImageComponentStyle={{ width: '100%' }}
                />

                {/* Trending Deals */}
                <Text style={styles.trendingTxt}>Trending Deals of the week</Text>
                <View style={styles.dealContainer}>
                    {deals.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() =>
                                navigation.navigate("Info", {
                                    id: item.id,
                                    title: item.title,
                                    price: item?.price,
                                    carouselImages: item.carouselImages,
                                    color: item?.color,
                                    size: item?.size,
                                    oldPrice: item?.oldPrice,
                                    item: item,
                                })
                            }
                            style={styles.dealContainer}>
                            <Image style={styles.dealImg} source={{ uri: item?.image }} />
                        </Pressable>
                    ))}
                </View>

                <Divider />

                {/* Today's Deals */}
                <Text style={styles.trendingTxt}>Today's Deals</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {offers.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() =>
                                navigation.navigate("Info", {
                                    id: item.id,
                                    title: item.title,
                                    price: item?.price,
                                    carouselImages: item.carouselImages,
                                    color: item?.color,
                                    size: item?.size,
                                    oldPrice: item?.oldPrice,
                                    item: item,
                                })
                            }
                            style={{
                                marginVertical: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image style={{ width: 150, height: 150, resizeMode: 'contain' }} source={{ uri: item?.image }} />
                            <View style={styles.offerBtn}>
                                <Text style={styles.offerTxt}>Upto {item?.offer}</Text>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>

                <Divider />
                {/*DropDown Picker*/}
                <View
                    style={{
                        marginHorizontal: 10,
                        marginTop: 20,
                        width: "45%",
                        marginBottom: open ? 50 : 15,
                    }}
                >
                    <DropDownPicker
                        style={{
                            borderColor: "#B7B7B7",
                            height: 30,
                            marginBottom: open ? 120 : 15,
                        }}
                        open={open}
                        value={category} //genderValue
                        items={items}
                        setOpen={setOpen}
                        setValue={setCategory}
                        setItems={setItems}
                        placeholder="choose category"
                        placeholderStyle={styles.placeholderStyles}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />
                </View>

                <View style={styles.productColumn}>
                    {products?.filter(item => item.category == category).map((product, index) => (
                        <ProductItem
                            item={product}
                            key={index}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        // Give top padding based on the status bar size
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
        flex: 1,
        backgroundColor: 'white',
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
    addressCont: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        padding: 10,
        backgroundColor: '#AFEEEE',
    },
    categoryItem: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryImg: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    categoryTxt: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 5,
    },
    trendingTxt: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    dealImg: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    dealContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    offerBtn: {
        marginHorizontal: 5,
        marginTop: 10,
        borderRadius: 4,
        backgroundColor: '#E31837',
        width: 120,
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
    },
    offerTxt: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 'bold',
    },
    productColumn: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    dropDownMenu: {

    }
});
