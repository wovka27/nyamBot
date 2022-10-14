import React from 'react';
import { ProductList } from '../Components';
import { useCatalog } from '../hooks';

export const Catalog: React.FC = () => {
    const { products, showProduct, addProductToBasket } = useCatalog();

    if (products.length === 0) {
        return null;
    }

    return (
        <ProductList
            products={products}
            title="Меню на сегодня"
            pattern={[/add\d+/, 'add', /more\d+/, 'more']}
            onClick={[addProductToBasket, showProduct]}
        />
    );
};
