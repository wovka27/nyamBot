import { useCommonBasket } from '../store';
import { useBotSendMessage } from './useBotSendMessage';
import { useCallback, useEffect, useMemo } from 'react';
import { getActionListText, getFoodBasketItemsList, setCookieBasket } from '../utils';
import { useCommand } from '@urban-bot/core';

const MAX_AMOUNT_FREE_SHIPPING = 1000;
const SHIPPING_PRICE = 120;

export const useFoodBasket = () => {
    const { productList, getAllIds, ids, totalPrice, products } = useCommonBasket();
    const { sendMessage, chat } = useBotSendMessage();
    const messageText = `Стоимость доставки на одного человека - ${
        totalPrice > MAX_AMOUNT_FREE_SHIPPING ? 0 : SHIPPING_PRICE / productList.size
    } ₽`;

    const sendMessageAllUsers = useCallback(
        () => Array.from(productList.keys()).forEach((item) => sendMessage(item.id, messageText)),
        [messageText, productList, sendMessage],
    );

    const code = useMemo(() => `document.cookie='${setCookieBasket(ids)}; path=/;';window.location.reload();`, [ids]);

    const send = useCallback(async () => {
        await sendMessage(chat.id, `${getFoodBasketItemsList(products)}\n${getActionListText(code)}`);
        await sendMessage(chat.id, 'Оповестить всех о стоимости доставки? /ok');
    }, [code, getAllIds, products, sendMessage]);

    useCommand(async ({ command }) => {
        if (command === '/ok') {
            await sendMessageAllUsers();
        }
    }, /ok/);

    useEffect(() => {
        getAllIds();
    }, [getAllIds, products.length]);

    return {products, ids, send}
};
