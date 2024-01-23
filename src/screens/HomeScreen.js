import { AntDesign, Entypo, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BottomModal, ModalContent, SlideAnimation } from 'react-native-modals';
import { Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { categories, deals, images, offers } from '../constants/StaticList.js';
import { fetchAddresses, fetchProducts } from '../constants/Api.js';

import Divider from '../components/Divider.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform } from 'react-native';
import ProductItem from '../components/ProductItem.js';
import SearchHeader from '../components/SearchHeader.js';
import { SliderBox } from 'react-native-image-slider-box';
import { StatusBar } from 'react-native';
import { UserContext } from "../../UserContext";
import { fetchUser } from '../constants/Api';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';

const HomeScreen = () => {
    const { userId, setUserId } = useContext(UserContext);

    const [addresses, setAddresses] = useState([]);
    const [defaultAddressSet, setDefaultAddressSet] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('electronics');
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState([
        { label: "Men's clothing", value: "men's clothing" },
        { label: "jewelery", value: "jewelery" },
        { label: "electronics", value: "electronics" },
        { label: "women's clothing", value: "women's clothing" },
    ]);

    const navigation = useNavigation();

    useEffect(() => {
        fetchUser({ setUserId })
        fetchProducts(setProducts)
    }, []);

    useEffect(() => {
        if (userId) {
            fetchAddresses({ userId, setAddresses });
        }
    }, [userId, setAddresses, modalVisible]);

    useEffect(() => {
        // After addresses are fetched, set the default selected address once
        if (!defaultAddressSet && addresses.length > 0) {
            setSelectedAddress(addresses[0]);
            setDefaultAddressSet(true);
        }
    }, [addresses, defaultAddressSet]);

    const cart = useSelector((state) => state.cart.cart);

    return (
        <>
            <SafeAreaView style={styles.container}>

                <StatusBar backgroundColor={'#00CED1'} />
                <ScrollView>

                    <SearchHeader />

                    {/* Address Bar */}
                    <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                        style={styles.addressCont}>
                        <Ionicons name="location-outline" size={24} color="black" />
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text numberOfLines={1} style={{
                                width: Dimensions.get('window').width - 150,
                                textAlign: 'left',
                                fontSize: 14,
                            }}>
                                Deliver to - {selectedAddress?.name?.split(' ')[0]} - {selectedAddress?.city}, {selectedAddress?.pincode}
                            </Text>

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

            {/* Bottom Modal */}
            <BottomModal
                onBackdropPress={() => setModalVisible(!modalVisible)}
                swipeDirection={['up', 'down']}
                swipeThreshold={200}
                modalAnimation={
                    new SlideAnimation({
                        slideFrom: 'bottom'
                    })
                }
                on onHardwareBackPress={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(!modalVisible)}
            >
                <ModalContent style={{
                    width: '100%',
                    height: '400',
                }} >
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{
                            fontSize: 18, fontWeight: '500',
                        }}>Choose your Location</Text>
                        <Text style={styles.addressHelperTxt}>Select a delivery location to see product availability and delivery</Text>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {/* Already added addresses */}

                        {addresses.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => {
                                    setSelectedAddress(item);
                                    setModalVisible(false);
                                }}
                                style={[styles.selectedAddressContainer, {
                                    backgroundColor: selectedAddress === item ? '#FFF2EA' : 'white',
                                    borderColor: selectedAddress === item ? '#FF8E42' : '#D0D0D0',
                                }]}>
                                <View style={styles.nameContainer}>
                                    <Text numberOfLines={1} style={styles.nameTxt}>{item?.name}</Text>
                                    <Entypo name="location-pin" size={20} color="red" />
                                </View>

                                <Text numberOfLines={1} style={styles.addressTxt}>{item?.houseNo}, {item?.landmark}</Text>
                                <Text numberOfLines={1} style={styles.addressTxt}>{item?.street}</Text>
                                <Text numberOfLines={1} style={styles.addressTxt}>{item?.city}</Text>
                                <Text style={styles.addressTxt}>{item?.state}, {item?.pincode}</Text>

                            </Pressable>
                        ))}
                        <Pressable
                            onPress={() => {
                                navigation.navigate("Address");
                                setModalVisible(false);
                            }}
                            style={styles.addAddressBtn}>
                            <Text style={styles.addAddressTxt}>Add an Address or pick-up point</Text>
                        </Pressable>
                    </ScrollView>

                    <View style={{
                        flexDirection: 'column',
                        gap: 7,
                        marginTop: 30
                    }}>
                        <View style={styles.pincodeContainer}>
                            <Entypo name="location-pin" size={22} color="#0066B2" />
                            <Text style={styles.pinLocationTxt}>Enter an Indian Pincode</Text>
                        </View>
                        <View style={styles.pincodeContainer}>
                            <Ionicons name="locate-sharp" size={22} color="#0066B2" />
                            <Text style={styles.pinLocationTxt}>Use my Current location</Text>
                        </View>
                        <View style={styles.pincodeContainer}>
                            <AntDesign name="earth" size={22} color="#0066B2" />
                            <Text style={styles.pinLocationTxt}>Deliver outside of India</Text>
                        </View>
                    </View>
                </ModalContent>
            </BottomModal >
        </>
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

    },
    addAddressBtn: {
        width: 140,
        height: 140,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        marginTop: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressHelperTxt: {
        marginTop: 5,
        fontSize: 16,
        color: 'gray'
    },
    addAddressTxt: {
        textAlign: 'center',
        color: '#0066B2',
        fontWeight: '400'
    },
    pincodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    pinLocationTxt: {
        color: '#0066B2',
        fontWeight: '400'
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    nameTxt: {
        width: 100,
        fontSize: 13,
        fontWeight: '800'
    },
    addressTxt: {
        width: 120,
        fontSize: 12,
        color: '#181818',
    },
    selectedAddressContainer: {
        width: 140,
        height: 140,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        marginRight: 15,
    }
});
