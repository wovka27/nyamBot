import React, { createContext, useContext } from 'react';
import { BasketItemType, ProductType } from '../types/store';
import { addProductCallback, removeProductCallback } from '../utils';

export type AddedProduct = BasketItemType & { count: number };

export type AddedProducts = Map<number, AddedProduct>;

type ProductCbType = (product: ProductType) => void

type BucketContextType = {
    addedProducts: AddedProducts;
    addProduct: ProductCbType;
    removeProduct: ProductCbType;
};

const BucketContext = createContext<BucketContextType>({} as BucketContextType);

type BucketProviderProps = {
    children: React.ReactNode;
};

export const BucketProvider: React.FC<BucketProviderProps> = ({ children }) => {
    const [addedProducts, setAddedProducts] = React.useState<AddedProducts>(new Map());

    const addProduct = (newProduct: ProductType) => setAddedProducts(addProductCallback(newProduct));
    const removeProduct = (deletedProduct: ProductType) => setAddedProducts(removeProductCallback(deletedProduct));

    return (
        <BucketContext.Provider value={{ addedProducts, addProduct, removeProduct }}>{children}</BucketContext.Provider>
    );
};

export const useBucket = () => useContext(BucketContext);
