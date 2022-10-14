import React from 'react';
import { ProductList } from '../Components';
import { Text } from '@urban-bot/core';
import { useBasket } from '../hooks';

export const Basket: React.FC = () => {
    const { products, add, remove, totalCount } = useBasket();

    if (products.length === 0) {
        return <Text>Корзина пуста...</Text>;
    }

    return (
        <ProductList
            products={products}
            onClick={[add, remove]}
            pattern={[/add\d+/, 'add', /delete\d+/, 'delete']}
            basket={totalCount}
        />
    );
};
