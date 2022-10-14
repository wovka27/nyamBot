import React, { memo, useEffect } from 'react';
import { Text } from '@urban-bot/core';
import { useFoodBasket } from '../hooks';

const FoodBasket: React.FC = () => {
    const { products, ids, send } = useFoodBasket();

    useEffect(() => {
        if (ids.length !== 0) {
            send();
        }
    }, [ids.length]);

    if (products.length === 0) {
        return <Text>Список пуст...</Text>;
    }

    return null;
};

export default memo(FoodBasket);
