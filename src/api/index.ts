import axios from 'axios';
import { BasketListResponseDataType, ProductsResponseDataType } from '../types/store';

enum Url {
    SITE = 'https://nyam-nyam.online',
}

export const client = axios.create({
    baseURL: Url.SITE,
    responseType: 'json',
});

export const getBasketList = async (): Promise<BasketListResponseDataType> => {
    return await client.get(`${Url.SITE}/get-basket-list`);
};

export const getProducts = async (): Promise<ProductsResponseDataType> => {
    return client.get(`${Url.SITE}/products-list/15`);
};
