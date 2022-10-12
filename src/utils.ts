import { BasketItemType, UserType } from './types/store';
import { AddedProduct } from './store';

export const setCookieBasket = (ids: string[]) => `basket=%5B${encodeURI(`${ids}`).replace(/,+/g, '%2C')}%5D`;

export const getTotalPrice = (products: IterableIterator<AddedProduct> | AddedProduct[]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return products.reduce((total, { count, price }) => (count && price ? total + count * price : 0), 0);
};

export const findAndActionProduct = <I>(
    items?: I[],
    callback?: (p: I) => void,
    predicate?: (value: I, index: number, obj: I[]) => unknown,
) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const product = items?.find?.(predicate);
    if (product) {
        callback?.(product);
    }
};

export const commandHOF =
    (callback: (index: number) => void) =>
    ({ command }: { command: string }) => {
        const index = Number(command.replace(/\D+/, '')) - 1;
        callback(index);
    };

export const getIds = (products: { user: UserType; addedProducts: BasketItemType[] }[]): string[] => {
    const id: string[] = [];

    if (!products?.length) {
        return [];
    }

    for (let i = 0; i < products.length; i++) {
        const items = products[i];
        for (let i = 0; i < items.addedProducts.length; i++) {
            const item = items.addedProducts[i];
            if (item.count === 1) {
                id.push(String(item.id));
            } else {
                id.push(...Array.from(Array(item.count).fill(String(item.id))));
            }
        }
    }
    return id;
};

export const scriptSetFormValues = `const fields = {apartment: '10',comment: 'aaa',house: '9',name: 'aa',phone: '89999999999',street: 'aa'};Object.keys(fields).forEach(key => document.forms[0].elements[key].value = fields[key])`;
export const getActionListText = (code: string) =>
    `=================================\n<b>Список действий:</b>\n<i>1. Перейти по ссылке https://nyam-nyam.online/basket/</i>\n<i>2. После загрузки страницы открыть консоль через F12 далее раздел консоль</i>\n<i>3. Вставить этот скрипт в консоль и нажать Enter\n<code>${code}</code>\n</i>\n<i>3. Для заполнения формы оформления заказа вставте этот скрипт и нажмите Enter\n<code>${scriptSetFormValues}</code>\n</i>\n`;
export const getFoodBasketItemsList = (products: { user: UserType; addedProducts: AddedProduct[] }[]) =>
    `<b>Общий список заказа:</b>\n\n${products
        .map(
            (item) =>
                `<b>Заказ от ${item.user.firstName} - ${getTotalPrice(item.addedProducts)}₽:</b>\n${item.addedProducts
                    .map((product) => `<i>${product.title} - ${product.count} шт</i>\n`)
                    .join('')}`,
        )
        .join('')}`;
