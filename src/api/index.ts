import axios from 'axios';
import { ProductsResponseDataType } from '../types/store';

enum Url {
    SITE = 'https://nyam-nyam.online',
}

export const client = axios.create({
    baseURL: Url.SITE,
    responseType: 'json',
});

export const getProducts = async (): Promise<ProductsResponseDataType> => {
    return client.get(`${Url.SITE}/products-list/15`);
};
