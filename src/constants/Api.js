export const API_URL = 'http://192.168.104.86:8000/api/v1';

import AsyncHandler from '../utils/AsyncHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const fetchProducts = AsyncHandler(async (setProducts) => {
    const response = await axios.get('https://fakestoreapi.com/products');
    setProducts(response.data);
});

export const fetchUser = AsyncHandler(async ({ setUserId }) => {
    const token = await AsyncStorage.getItem('authToken');
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    setUserId(userId);
});

export const addAddress = AsyncHandler(async ({ userId, address }) => {
    const response = await axios.post(`${API_URL}/address/add`, { userId, address });
    return response.status === 201;
});

export const fetchAddresses = AsyncHandler(async ({ userId, setAddresses }) => {
    const response = await axios.get(`${API_URL}/address/${userId}`);
    const addresses = response.data;
    setAddresses(addresses);
});
