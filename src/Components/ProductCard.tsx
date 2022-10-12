import React, { useCallback } from 'react';
import { Button, ButtonGroup, Image } from '@urban-bot/core';
import { ProductType } from '../types/store';
import { useBucket } from '../store';

interface ProductCardProps {
    product: ProductType;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addProduct, addedProducts, removeProduct } = useBucket();

    const addProductHandle = useCallback(() => addProduct(product), [product]);
    const removeProductHandle = useCallback(() => removeProduct(product), [product]);

    const addedProduct = addedProducts && addedProducts.get(product?.pk);

    return (
        <Image
            title={`Название: ${product?.title}\nЦена: ${product?.price} ₽\nИнгридиенты: ${product?.desc}`}
            file={`https://nyam-nyam.online${product?.image}`}
            buttons={
                <ButtonGroup maxColumns={2}>
                    <Button onClick={removeProductHandle}>Удалить</Button>
                    <Button onClick={addProductHandle}>{`Добавить(${addedProduct?.count ?? 0})`}</Button>
                </ButtonGroup>
            }
        />
    );
};
