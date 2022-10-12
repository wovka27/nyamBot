import { BasketItemType } from './basket';

export interface ProductType extends BasketItemType {
    category: number;
    producer_title: string;
    title: string;
    pk: number;
    image: string;
    options: unknown;
    price: number;
    desc: string;
}

export type ProductsResponseDataType = {
    data: {
        msg: string;
        code: number;
        data: {
            products: ProductType[];
            filters: FilterType;
        };
    };
};

export enum ProductCategoriesEnum {
    SALADS = 27,
    FIRST_COURSE = 83,
    SECOND_COURSE = 84,
    GARNISH = 26,
    BAKERY = 43,
    DRINKS = 31,
    BREAD = 42,
}

export type DishesType = {
    pk: number;
    title: string;
};

export type FilterType = {
    options: object;
    dishes: DishesType[];
};
