import React, { createContext, useContext, useCallback, useState } from 'react';
import { ProductType } from '../types/store';
import { fetchProductCallback } from '../utils';

export enum StatusEnum {
    LOADING = 'Загрузка',
    ERROR = 'Ошибка',
    SUCCESS = 'Успешно',
}
type ProductsContextType = {
    products: ProductType[];
    fetchProducts: () => void;
    status?: StatusEnum;
};

const ProductsContext = createContext<ProductsContextType>({} as ProductsContextType);

type ProductsProviderProps = {
    children: React.ReactNode;
};

export function ProductsProvider({ children }: ProductsProviderProps) {
    const [products, setProducts] = React.useState<ProductType[]>([]);
    const [status, setStatus] = useState<StatusEnum>();

    const fetchProducts = useCallback(() => fetchProductCallback(products, setStatus, setProducts), [products.length]);

    return <ProductsContext.Provider value={{ products, fetchProducts, status }}>{children}</ProductsContext.Provider>;
}

export const useProducts = () => useContext(ProductsContext);
