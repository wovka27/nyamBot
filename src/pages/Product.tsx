import React from 'react';
import { ProductCard } from '../Components';
import { useRouter } from '@urban-bot/core';
import { ProductType } from '../types/store';

export const Product: React.FC = () => {
    const { query } = useRouter<{ product: ProductType }>();
    return <ProductCard product={query.product} />;
};
