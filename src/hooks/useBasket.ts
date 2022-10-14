import { useBucket, useCommonBasket, useProducts } from '../store';
import { useBotSendMessage } from './useBotSendMessage';
import { useCallback, useEffect, useMemo } from 'react';
import { commandHOF, findAndActionProduct, getTotalPrice } from '../utils';
import { useCommand } from '@urban-bot/core';
import { UserType } from '../types/store';

export const useBasket = () => {
    const { addedProducts, addProduct, removeProduct } = useBucket();
    const { saveProductList } = useCommonBasket();
    const { products: items } = useProducts();
    const { sendMessage, chat } = useBotSendMessage();
    const products = Array.from(addedProducts.values());
    const totalCount: number = useMemo(() => getTotalPrice(products), [products]);
    const command = useCallback(commandHOF, [commandHOF]);

    const add = command((index) => findAndActionProduct(items, addProduct, (item) => item.pk === products[index].id));
    const remove = command((index) =>
        findAndActionProduct(items, removeProduct, (item) => item.pk === products[index].id),
    );

    useCommand(({ command }) => command === '/ok' && saveProductList(chat as UserType, products), /ok/);

    useEffect(() => {
        if (products.length !== 0) {
            sendMessage(chat.id, 'Записать(перезаписать) список в общую корзину? /ok');
        }
    }, [products.length]);

    return { add, remove, totalCount, sendMessage, chat, products };
};
