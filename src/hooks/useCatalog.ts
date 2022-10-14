import { useBucket, useProducts } from '../store';
import { useRouter } from '@urban-bot/core';
import { useCallback, useEffect } from 'react';
import { commandHOF } from '../utils';
import { RoutesEnum } from '../types/routes';

export const useCatalog = () => {
    const { products, fetchProducts } = useProducts();
    const { addProduct } = useBucket();
    const { navigate } = useRouter();
    const command = useCallback(commandHOF, [commandHOF]);

    const showProduct = command((index) => navigate(RoutesEnum.PRODUCT, { product: products[index] }));
    const addProductToBasket = command((index) => addProduct(products[index]));

    useEffect(() => {
        fetchProducts();
    }, []);

    return { showProduct, addProductToBasket, products };
};
