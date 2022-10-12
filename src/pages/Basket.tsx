import React, { useCallback, useEffect, useMemo } from 'react';
import { Text, useBotContext } from '@urban-bot/core';
import { ProductList } from '../Components';
import { AddedProduct, useBucket } from '../store';
import { UserType } from '../types/store';
import { commandHOF, findAndActionProduct, getTotalPrice } from '../utils';

export const Basket: React.FC = () => {
    const { addProduct, removeProduct, productList, addedProducts, saveProductList, getAllIds } = useBucket();
    const { chat } = useBotContext();
    const isProducts: boolean = productList.has(chat as UserType);
    const products: AddedProduct[] = useMemo(
        () =>
            isProducts
                ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  Array.from(productList.entries()).find(([user]) => user.id === chat.id)[1]
                : [],
        [chat.id, isProducts, productList],
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const totalCount: number = useMemo(() => (products ? getTotalPrice(products) : 0), [products]);
    const command = useCallback(commandHOF, [commandHOF]);

    const add = command((index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        findAndActionProduct(products, addProduct, (item) => item.pk === products[index].id);
    });

    const remove = command((index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        findAndActionProduct(products, removeProduct, (item) => item.pk === products[index].id);
    });

    useEffect(() => {
        if (products.length !== 0) {
            getAllIds();
        }
    }, [products.length]);

    useEffect(() => {
        if (addedProducts.size) {
            saveProductList(chat as UserType);
        }
    }, [addedProducts.size]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (products.length === 0) {
        return null;
    }

    return (
        <ProductList
            products={products}
            pattern={[/add\d+/, 'add', /delete\d+/, 'delete']}
            onClick={[add, remove]}
            basket={totalCount}
        />
    );
};
