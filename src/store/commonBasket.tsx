import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { UserType } from '../types/store';
import { getIds, getTotalPrice } from '../utils';
import { AddedProduct } from './bucket';

type CommonBasketContextType = {
    saveProductList: (user: UserType, products: AddedProduct[]) => void;
    getAllIds: () => void;
    ids: string[];
    productList: Map<UserType, AddedProduct[]>;
    products: { user: UserType; addedProducts: AddedProduct[] }[];
    totalPrice: number;
};

const CommonBasketContext = createContext<CommonBasketContextType>({} as CommonBasketContextType);

type CommonBasketProviderProps = {
    children: React.ReactNode;
};

export const CommonBasketProvider: React.FC<CommonBasketProviderProps> = ({ children }) => {
    const [productList, setProductList] = useState<Map<UserType, AddedProduct[]>>(new Map());
    const [ids, setIds] = useState<string[]>([]);

    const saveProductList = (user: UserType, products: AddedProduct[]) => {
        setProductList((productList) => new Map(productList).set(user, products));
    };

    const products = useMemo(
        () =>
            Array.from(productList.entries()).map(([user, products]) => ({
                user,
                addedProducts: products,
            })),
        [productList],
    );

    const getAllIds = useCallback(() => setIds(getIds(products)), [products]);

    const totalPrice = useMemo(
        () => Array.from(productList.values()).reduce((total, products) => total + getTotalPrice(products), 0),
        [productList],
    );

    return (
        <CommonBasketContext.Provider value={{ saveProductList, productList, getAllIds, ids, products, totalPrice }}>
            {children}
        </CommonBasketContext.Provider>
    );
};

export const useCommonBasket = () => useContext(CommonBasketContext);
