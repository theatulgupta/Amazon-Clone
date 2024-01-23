import { Alert, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { addAddress, addOrder, fetchAddresses } from '../constants/Api';
import { useDispatch, useSelector } from 'react-redux';

import RazorPayCheckout from 'react-native-razorpay';
import { UserContext } from "../../UserContext";
import { cleanCart } from '../redux/CartReducer.redux';
import { useNavigation } from '@react-navigation/native';

const ConfirmationScreen = () => {
    const navigation = useNavigation();

    const { userId } = useContext(UserContext);

    const cart = useSelector((state) => state.cart.cart);
    const total = cart?.map((item) => item?.price * item?.quantity)
        .reduce((previous, current) => previous + current, 0);

    const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" }
    ]

    const dispatch = useDispatch();
    const [addresses, setAddresses] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [options, setOptions] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');

    const fetchAndSetAddresses = useCallback(() => {
        fetchAddresses({ userId, setAddresses });
    }, [userId]);

    useEffect(() => {
        fetchAndSetAddresses();
    }, [fetchAndSetAddresses]);

    const handlePlaceOrder = async () => {

        const orderData = {
            userId: userId,
            cartItems: cart,
            totalPrice: total,
            shippingAddress: selectedAddress,
            paymentMethod: paymentMethod,
        }

        const response = await addOrder(orderData);

        if (response) {
            navigation.navigate('Order');
            dispatch(cleanCart());
        } else {
            console.log("Error creating order", response);
        }
    }

    const pay = async () => {
        try {
            const options = {
                description: "Adding To Wallet",
                currency: "INR",
                name: "Amazon",
                key: "rzp_test_VGWMlK3m78goa3",
                amount: total * 100,
                prefill: {
                    email: "void@razorpay.com",
                    contact: "9999999999",
                    name: "RazorPay Testing"
                },
                theme: {
                    color: "#F37254"
                }
            };

            const data = await RazorPayCheckout.open((options));

            console.log(data);

            handlePlaceOrder();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor={'#00CED1'} />
            <View style={styles.dummyHeader} />

            {/* Steps Indicator */}
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingTop: 20,
                }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                    justifyContent: 'space-between'
                }}>
                    {steps.map((step, index) => (
                        <View
                            key={index}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            {index > 0 && (
                                <View style={[
                                    { flex: 1, height: 2, backgroundColor: 'green' },
                                    index <= currentStep && { backgroundColor: 'green' }
                                ]} />
                            )}
                            <View style={[
                                {
                                    width: 30,
                                    height: 30,
                                    borderRadius: 15,
                                    backgroundColor: '#cccccc',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                index < currentStep && { backgroundColor: 'green' }
                            ]}>
                                {index < currentStep ? (
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}>&#10003;</Text>
                                ) : (
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}>{index + 1}</Text>
                                )}
                            </View>
                            <Text style={{
                                textAlign: 'center',
                                marginTop: 5,
                            }}>{step.title}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* For currentStep === 0 */}
            {currentStep === 0 && (
                <View style={{
                    marginHorizontal: 20,
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700'
                    }}>Select Delivery Address</Text>

                    <Pressable>
                        {addresses?.map((item, index) => (
                            <Pressable
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 6,
                                    backgroundColor: 'white',
                                    borderColor: '#D0D0D0',
                                    padding: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 5,
                                    paddingBottom: 15,
                                    marginVertical: 7,
                                }}
                                key={index}>
                                {selectedAddress && selectedAddress?._id === item?._id ? (
                                    <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                                ) : (
                                    <Entypo onPress={() => setSelectedAddress(item)} name="circle" size={20} color="gray" />
                                )}

                                <View style={{ marginLeft: 6 }}>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.nameTxt}>{item?.name}</Text>
                                        <Entypo name="location-pin" size={20} color="red" />
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
                                    {/* Next Button after Selecting Address */}
                                    <View>
                                        {selectedAddress && selectedAddress._id === item?._id && (
                                            <Pressable
                                                onPress={() => setCurrentStep(1)}
                                                style={{
                                                    backgroundColor: '#008397',
                                                    padding: 10,
                                                    borderRadius: 20,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: 10,
                                                }}>
                                                <Text style={{ textAlign: 'center', color: 'white' }}>
                                                    Deliver to this Address
                                                </Text>
                                            </Pressable>
                                        )}
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                    </Pressable>

                </View>
            )}

            {/* For currentStep === 1 */}
            {currentStep === 1 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700'
                    }}>Choose your delivery options</Text>

                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        alignItems: 'center',
                        padding: 8,
                        borderRadius: 6,
                        gap: 5,
                        borderColor: '#D0D0D0',
                        borderWidth: 1,
                        marginTop: 10,
                    }}>
                        {options ? (
                            <FontAwesome5
                                onPress={() => setOptions(!options)}
                                name="dot-circle" size={20} color="#008397" />
                        ) : (
                            <Entypo
                                onPress={() => setOptions(!options)}
                                name="circle" size={20} color="gray" />
                        )}
                        <Text style={{ flex: 1 }}>
                            <Text style={{
                                color: 'green',
                                fontWeight: '500'
                            }}>Tomorrow by 10pm
                            </Text>
                            - FREE delivery with your Prime Membership
                        </Text>
                    </View>
                    <Pressable
                        onPress={() => setCurrentStep(2)}
                        style={{
                            backgroundColor: '#FFC72C',
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignContent: 'center',
                            marginTop: 10
                        }}>
                        <Text style={{ textAlign: 'center' }}>Continue</Text>
                    </Pressable>

                </View>
            )}

            {/* For currentStep === 2 */}
            {currentStep === 2 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700'
                    }}>Select your Payment Method</Text>

                    {/* Cash on Delivery */}
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        alignItems: 'center',
                        padding: 8,
                        gap: 5,
                        borderRadius: 6,
                        borderColor: '#D0D0D0',
                        borderWidth: 1,
                        marginTop: 10,
                    }}>
                        {paymentMethod === 'cash' ? (
                            <FontAwesome5
                                name="dot-circle" size={20} color="#008397" />
                        ) : (
                            <Entypo
                                onPress={() => setPaymentMethod('cash')}
                                name="circle" size={20} color="gray" />
                        )}

                        <Text style={{ flex: 1 }}>
                            Cash on Delivery
                        </Text>
                    </View>

                    {/* UPI / Credit or Debit card */}
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        alignItems: 'center',
                        padding: 8,
                        gap: 5,
                        borderRadius: 6,
                        borderColor: '#D0D0D0',
                        borderWidth: 1,
                        marginTop: 10,
                    }}>
                        {paymentMethod === 'card' ? (
                            <FontAwesome5
                                name="dot-circle" size={20} color="#008397" />
                        ) : (
                            <Entypo
                                onPress={() => {
                                    setPaymentMethod('card')
                                    Alert.alert("UPI/Debit Card", "Pay Online", [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel is pressed")
                                        },
                                        {
                                            text: "Pay",
                                            onPress: () => pay()
                                        }
                                    ]);
                                }}
                                name="circle" size={20} color="gray" />
                        )}

                        <Text style={{ flex: 1 }}>
                            UPI / Credit or Debit card
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => setCurrentStep(3)}
                        style={{
                            backgroundColor: '#FFC72C',
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignContent: 'center',
                            marginTop: 10
                        }}>
                        <Text style={{ textAlign: 'center' }}>Continue</Text>
                    </Pressable>
                </View>
            )}

            {/* For currentStep === 3 */}
            {currentStep === 3 && paymentMethod === 'cash' && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700'
                    }}>Order Now</Text>

                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        alignItems: 'center',
                        padding: 8,
                        gap: 5,
                        borderRadius: 6,
                        justifyContent: 'space-between',
                        borderColor: '#D0D0D0',
                        borderWidth: 1,
                        marginTop: 10,
                    }}>
                        <View>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Save 5% and never run out</Text>
                            <Text style={{ fontSize: 14, color: 'gray', marginTop: 5 }}>Turn on auto deliveries</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
                    </View>

                    <View style={{
                        backgroundColor: 'white',
                        padding: 8,
                        borderColor: '#D0D0D0',
                        borderWidth: 1,
                        marginTop: 10,
                        borderRadius: 6,
                        justifyContent: 'center',
                    }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Shipping to {selectedAddress?.name}</Text>

                        {/* Items */}
                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 500,
                                color: 'gray',
                            }}>Items</Text>
                            <Text style={{
                                color: 'gray',
                                fontSize: 16,
                            }}>₹{total}</Text>
                        </View>

                        {/* Delivery */}
                        <View style={{
                            marginTop: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 500,
                                color: 'gray',
                            }}>Delivery</Text>
                            <Text style={{
                                color: 'gray',
                                fontSize: 16,
                            }}>₹{0}</Text>
                        </View>

                        {/* Order Total */}
                        <View style={{
                            marginTop: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '800',
                                marginBottom: 5,
                            }}>Order Total</Text>
                            <Text style={{
                                color: '#C60C30',
                                fontSize: 17,
                                fontWeight: '900',
                                marginBottom: 5,
                            }}>₹{total}</Text>
                        </View>

                    </View>

                    {/* Payment Details */}
                    <View style={{
                        marginTop: 10,
                        borderRadius: 6,
                        backgroundColor: 'white',
                        padding: 8,
                        borderColor: '#D0D0D0',
                        borderWidth: 1,
                    }}>
                        <Text style={{
                            fontSize: 15,
                            color: 'gray'
                        }}>Pay With</Text>
                        <Text style={{
                            marginTop: 7,
                            fontSize: 15,
                            fontWeight: '600',
                        }}>Pay on deliveries (Cash)</Text>
                    </View>

                    {/* Place Order Button */}
                    <Pressable
                        onPress={handlePlaceOrder}
                        style={{
                            backgroundColor: '#FFC72C',
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignContent: 'center',
                            marginTop: 20
                        }}>
                        <Text style={{ textAlign: 'center' }}>Place Order</Text>
                    </Pressable>
                </View>
            )}


        </ScrollView>
    )
}

export default ConfirmationScreen

const styles = StyleSheet.create({
    container: {
        // Give top padding based on the status bar size
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
        flex: 1,
        // backgroundColor: 'white',
    },
    dummyHeader: {
        height: 38,
        backgroundColor: '#00CED1',
        justifyContent: 'center',
        alignItems: 'center',
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
