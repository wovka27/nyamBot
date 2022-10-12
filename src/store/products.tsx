import React, { createContext, useContext, useCallback, useState } from 'react';
import { getProducts } from '../api';
import { ProductType } from '../types/store';

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

    const fetchProducts = useCallback(async () => {
        if (products.length > 0) {
            return;
        }
        setStatus(StatusEnum.LOADING);
        try {
            const response = await getProducts();
            if (response) {
                setProducts(response.data.data.products);
            }
            setStatus(StatusEnum.SUCCESS);
        } catch (err) {
            setStatus(StatusEnum.ERROR);
        }
    }, [products.length]);

    return <ProductsContext.Provider value={{ products, fetchProducts, status }}>{children}</ProductsContext.Provider>;
}

export const useProducts = () => useContext(ProductsContext);
