import React from 'react';
import { Button, ButtonGroup, Route, Router, useText } from '@urban-bot/core';
import { Basket, Catalog, Product } from './pages';
import { useBotSendMessage } from './hooks';
import FoodBasket from './pages/FoodBasket';
import { BucketProvider, ProductsProvider } from './store';
import { RoutesEnum } from './types/routes';

export const App = () => {
    const { sendMessage } = useBotSendMessage();

    useText(async ({ text, from }) => {
        if (
            text !== RoutesEnum.CART &&
            text !== RoutesEnum.CATALOG &&
            text !== RoutesEnum.ARRANGE &&
            text !== RoutesEnum.ACTION_LIST &&
            text !== RoutesEnum.PRODUCT
        ) {
            if (from.id != null) {
                await sendMessage(from.id, `${from.firstName}, я вас не понимаю...`);
            }
        }
    });

    return (
        <BucketProvider>
            <ProductsProvider>
                <ButtonGroup title="Для просмотра меню нажми Каталог" isReplyButtons maxColumns={2} isResizedKeyboard>
                    <Button>Корзина</Button>
                    <Button>Каталог</Button>
                    <Button>Оформить</Button>
                </ButtonGroup>
                <Router>
                    <Route path="Корзина">
                        <Basket />
                    </Route>
                    <Route path="Каталог">
                        <Catalog />
                    </Route>
                    <Route path="Оформить">
                        <FoodBasket />
                    </Route>
                    <Route path="Product">
                        <Product />
                    </Route>
                </Router>
            </ProductsProvider>
        </BucketProvider>
    );
};
