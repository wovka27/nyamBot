import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useBotContext, useText } from "@urban-bot/core";
import { getActionListText, getFoodBasketItemsList, getTotalPrice, setCookieBasket } from '../utils';
import { useBucket } from '../store';
import { useBotSendMessage } from '../hooks';

const MAX_AMOUNT_FREE_SHIPPING = 1000;
const SHIPPING_PRICE = 120;

const FoodBasket: React.FC = () => {
    const { productList, ids } = useBucket();
    const { sendMessage } = useBotSendMessage();
    const { chat } = useBotContext();

    const products = useMemo(
        () => Array.from(productList.entries()).map(([user, products]) => ({ user, addedProducts: products })),
        [productList],
    );

    const totalPrice = useMemo(
        () => Array.from(productList.values()).reduce((total, products) => total + getTotalPrice(products), 0),
        [productList],
    );

    const messageText = `Стоимость доставки на одного человека - ${
        totalPrice > MAX_AMOUNT_FREE_SHIPPING ? 0 : SHIPPING_PRICE / productList.size
    } ₽`;

    const sendMessageAllUsers = useCallback(
        () => Array.from(productList.keys()).forEach((item) => sendMessage(item.id, messageText)),
        [messageText, productList, sendMessage],
    );

    const code = useMemo(() => `document.cookie='${setCookieBasket(ids)}; path=/;';window.location.reload();`, [ids]);

    const send = useCallback(async () => {
        await sendMessage(chat.id, getFoodBasketItemsList(products));
        await sendMessage(chat.id, getActionListText(code));
        await sendMessageAllUsers();
    }, [code, products]);

    useEffect(() => {
        send();
    }, []);

    return null;
};

export default memo(FoodBasket);
