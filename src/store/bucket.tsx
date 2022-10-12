import React, { createContext, useContext, useMemo, useState } from 'react';
import { BasketItemType, UserType, ProductType } from '../types/store';
import { getIds, getTotalPrice } from '../utils';

export type AddedProduct = BasketItemType & { count: number };

export type AddedProducts = Map<number, AddedProduct>;

type BucketContextType = {
    addedProducts: AddedProducts;
    addProduct: (product: ProductType) => void;
    removeProduct: (product: ProductType) => void;
    saveProductList: (user: UserType) => void;
    getAllIds: () => void;
    ids: string[];
    productList: Map<UserType, AddedProduct[]>;
};

const BucketContext = createContext<BucketContextType>({} as BucketContextType);

type BucketProviderProps = {
    children: React.ReactNode;
};

export const BucketProvider: React.FC<BucketProviderProps> = ({ children }) => {
    const [addedProducts, setAddedProducts] = React.useState<AddedProducts>(new Map());
    const [productList, setProductList] = useState<Map<UserType, AddedProduct[]>>(new Map());
    const [ids, setIds] = useState<string[]>([]);

    const addProduct = (newProduct: ProductType) => {
        setAddedProducts((addedProducts) => {
            const newAddedProducts = new Map(addedProducts);

            if (newAddedProducts.has(newProduct.pk)) {
                const addedProduct = newAddedProducts.get(newProduct.pk) as AddedProduct;

                addedProduct.count += 1;
            } else {
                newAddedProducts.set(newProduct.pk, { ...newProduct, count: 1, id: newProduct.pk });
            }

            return newAddedProducts;
        });
    };

    const removeProduct = (deletedProduct: ProductType) => {
        setAddedProducts((addedProducts) => {
            const addedProduct = addedProducts.get(deletedProduct.pk);

            if (addedProduct === undefined) {
                return addedProducts;
            }

            const newAddedProducts = new Map(addedProducts);

            addedProduct.count -= 1;

            if (addedProduct.count === 0) {
                newAddedProducts.delete(deletedProduct.pk);
            }

            return new Map(newAddedProducts);
        });
    };

    const saveProductList = (user: UserType) => {
        setProductList((productList) => {
            const newProductList = new Map(productList);

            if (newProductList.has(user)) {
                return newProductList;
            } else {
                newProductList.set(user, Array.from(addedProducts.values()));
            }
            return newProductList;
        });
    };

    const getAllIds = () => {
        const products = Array.from(productList.entries()).map(([user, products]) => ({
            user,
            addedProducts: products,
        }));
        setIds(getIds(products));
    };

    return (
        <BucketContext.Provider
            value={{
                addedProducts,
                addProduct,
                removeProduct,
                saveProductList,
                productList,
                getAllIds,
                ids,
            }}
        >
            {children}
        </BucketContext.Provider>
    );
};

export const useBucket = () => useContext(BucketContext);
