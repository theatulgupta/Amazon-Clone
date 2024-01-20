import { AntDesign, Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import React from 'react'

const SearchHeader = () => {
    return (
        <View style={styles.searchCont}>
            <Pressable style={styles.searchBox}>
                <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
                <TextInput placeholder="Search Amazon.in" />
            </Pressable>
            <Feather name="mic" size={24} color="black" />
        </View>
    )
}

export default SearchHeader

const styles = StyleSheet.create({
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
});