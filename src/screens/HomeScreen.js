import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { StatusBar } from 'react-native'

const HomeScreen = () => {
    const list = [
        {
            id: "0",
            image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
            name: "Home",
        },
        {
            id: "1",
            image:
                "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
            name: "Deals",
        },
        {
            id: "3",
            image:
                "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
            name: "Electronics",
        },
        {
            id: "4",
            image:
                "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
            name: "Mobiles",
        },
        {
            id: "5",
            image:
                "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
            name: "Music",
        },
        {
            id: "6",
            image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
            name: "Fashion",
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                {/*Search Bar*/}
                <View style={styles.searchCont}>
                    <Pressable style={styles.searchBox}>
                        <AntDesign name="search1" size={22} color="black" />
                        <TextInput
                            style={{ fontSize: 16 }}
                            placeholder='Search Amazon.in' />
                    </Pressable>
                    <Feather name="mic" size={24} color="black" />
                </View>

                {/*Address Bar*/}
                <View style={styles.addressCont}>
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Pressable>
                        <Text style={{ fontSize: 14, fontWeight: '500' }}>
                            Deliver to Atul Gupta - Belkheda (483119)
                        </Text>
                    </Pressable>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </View>

                {/*Categories*/}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {list.map((item, index) => (
                        <Pressable
                            style={styles.categoryItem}
                            key={index}>
                            <Image style={styles.categoryImg} source={{ uri: item.image }} />
                            <Text style={styles.categoryTxt}>{item.name}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
        flex: 1
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
        resizeMode: 'contain'
    },
    categoryTxt: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 5
    }
});