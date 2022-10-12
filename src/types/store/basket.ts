import { UserType } from './user';

export interface BasketItemType {
    count?: number;
    price?: number;
    id: number;
    producer_id?: number;
    title?: string;
    image?: string;
}


export type BasketItemsResponseDataType = {
    msg: string;
    code: number;
    data: {
        price: string;
        basket: BasketItemType[];
    };
};

export type BasketListResponseDataType = {
    msg: string;
    code: number;
    data: {
        basket: {
            'stolovaya-sibinformbyuro': StolovayaSibinFormByuroDataType;
        };
        customer: '';
        stocks: StocksType[];
        payment_types: PaymentTypes;
        address: string;
    };
};

export type StocksType = {
    type: {
        type: null;
    };
    products: BasketItemType[];
    producer_pk: number;
    producer_slug: string;
};

export type PaymentTypes = {
    courier_cash: string;
    courier_card: string;
    card_online: string;
};

export type StolovayaSibinFormByuroDataType = {
    delivery_min_price: number;
    title: string;
    delivery_price: number;
    open_time_if_closed: unknown | null;
    products: BasketItemType[];
    payment_types: ['courier_cash', 'card_online'];
    link: string;
    open_time: unknown | null;
};
