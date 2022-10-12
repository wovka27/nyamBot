import React, { useEffect } from 'react';
import { useBotContext, useCommand } from '@urban-bot/core';
import { ProductType, BasketItemType } from '../types/store';
import { useBotSendMessage } from '../hooks';

interface ProductListProps {
    basket?: number;
    onClick: Array<({ command }: { command: string }) => void>;
    title?: string;
    pattern: Array<RegExp | string>;
    products?: ProductType[] | BasketItemType[];
}

export const ProductList: React.FC<ProductListProps> = ({ products, title, onClick, pattern, basket }) => {
    const { sendMessage } = useBotSendMessage();
    const { chat } = useBotContext();
    useCommand(onClick[0], pattern[0]);
    useCommand(onClick[1], pattern[2]);

    const productListBody = basket
        ? `<b>Корзина</b>\n\n${products
              ?.map(
                  (product, index) =>
                      `<i>${product.title}</i> - <b>${(product.price ?? 0) * (product.count ?? 0)} ₽</b> - <b>${
                          product.count
                      } шт.</b> /${pattern[1]}${index + 1} /${pattern[3]}${index + 1}\n`,
              )
              .join('')}-----------------------------------\n<b>Итого: ${basket} ₽</b>`
        : `<b>${title}</b>\n\n${products
              ?.map(
                  (product, index) =>
                      `<i>${product.title}</i> - <b>${product.price} ₽</b> /${pattern[1]}${index + 1} /${pattern[3]}${
                          index + 1
                      }\n`,
              )
              .join('')}`;

    useEffect(() => {
        sendMessage(chat.id, productListBody);
    }, []);

    return null;
};
