import React, { useEffect } from 'react';
import { useCommand } from '@urban-bot/core';
import { ProductType } from '../types/store';
import { useBotSendMessage } from '../hooks';
import { showProductBodyList } from '../utils';
import { AddedProduct } from '../store';

interface ProductListProps {
    basket?: number;
    onClick: Array<({ command }: { command: string }) => void>;
    title?: string;
    pattern: Array<RegExp | string>;
    products?: ProductType[] | AddedProduct[];
}

export const ProductList: React.FC<ProductListProps> = ({ products, title, onClick, pattern, basket }) => {
    const { sendMessage, chat } = useBotSendMessage();

    useCommand(onClick[0], pattern[0]);
    useCommand(onClick[1], pattern[2]);

    const productListBody = basket
        ? `<b>Корзина</b>\n\n${showProductBodyList(
              products,
              [pattern[1], pattern[3]],
              true,
          )}-----------------------------------\n<b>Итого: ${basket} ₽</b>`
        : `<b>${title}</b>\n\n${showProductBodyList(products, [pattern[1], pattern[3]], false)}`;

    useEffect(() => {
        sendMessage(chat.id, productListBody);
    }, []);

    return null;
};
