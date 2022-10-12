import React, { useCallback, useEffect } from 'react';
import { useBotContext, useRouter, useText } from '@urban-bot/core';
import { useBucket, useProducts } from '../store';
import { ProductList } from '../Components';
import { commandHOF } from '../utils';
import { RoutesEnum } from '../types/routes';
import { UserType } from '../types/store';

export const Catalog: React.FC = () => {
    const { products, fetchProducts } = useProducts();
    const { addProduct } = useBucket();
    const { navigate} = useRouter();
    const command = useCallback(commandHOF, [commandHOF]);

    const showProduct = command((index) => {
        navigate(RoutesEnum.PRODUCT, { product: products[index] });
    });

    const addProductToBasket = command((index) => addProduct(products[index]));

    useEffect(() => {
        fetchProducts();
    }, []);

    if (products.length === 0) {
        return null;
    }

    return (
        <ProductList
            products={products}
            title="Меню на сегодня"
            pattern={[/add\d+/, 'add', /more\d+/, 'more']}
            onClick={[addProductToBasket, showProduct]}
        />
    );
};
