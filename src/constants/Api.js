export const API_URL = 'http://192.168.151.86:8000/api/v1';

import axios from 'axios';

export const fetchProducts = async (setProducts) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
    } catch (error) {
        console.log(error);
    }
}