import { BasketItemType, ProductType, UserType } from './types/store';
import { AddedProduct, StatusEnum } from './store';
import { getProducts } from './api';

/**
 *  Формирование Куки basket
 * @param ids
 */
export const setCookieBasket = (ids: string[]) => `basket=%5B${encodeURI(`${ids}`).replace(/,+/g, '%2C')}%5D`;

/**
 * Получение общей суммы
 * @param products
 */
export const getTotalPrice = <T>(products: T[]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return products.reduce((total, { count, price }) => (count && price ? total + count * price : 0), 0);
};

/**
 * Поиск продукта и дальнейшие дествия над ним
 * @param items
 * @param callback
 * @param predicate
 */
export const findAndActionProduct = <I>(
    items: I[],
    callback: (p: I) => void,
    predicate: (value: I, index: number, obj: I[]) => unknown,
) => {
    const product = items.find(predicate);
    if (product) {
        callback(product);
    }
};

export const commandHOF =
    (callback: (index: number) => void) =>
    ({ command }: { command: string }) => {
        const index = Number(command.replace(/\D+/, '')) - 1;
        callback(index);
    };

/**
 * Получение айдишников из списка общей корзины
 * @param products
 */
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

const getIsNumber = <N>(n?: N) => (n ? Number(n) : 0);

type Key<K> = keyof K;

/**
 * Получение тела отрисовки продкта
 * @param product
 * @param pattern
 * @param index
 * @param basket
 */
const getProductBody = <T>(product: T, pattern: Array<string | RegExp>, index: number, basket: boolean): string =>
    basket
        ? `<i>${product['title' as Key<T>]}</i> - <b>${
              getIsNumber(product['price' as Key<T>]) * getIsNumber(product['count' as Key<T>])
          } ₽</b> - <b>${product['count' as Key<T>]} шт.</b> /${pattern[0]}${index + 1} /${pattern[1]}${index + 1}\n`
        : `<i>${product['title' as Key<T>]}</i> - <b>${product['price' as Key<T>]} ₽</b> /${pattern[0]}${index + 1} /${
              pattern[1]
          }${index + 1}\n`;

/**
 * Показ списка тел для отрисовки прдктов
 * @param products
 * @param pattern
 * @param basket
 */
export const showProductBodyList = (
    products: ProductType[] | BasketItemType[] | undefined,
    pattern: Array<string | RegExp>,
    basket: boolean,
) => {
    return products?.map((product, index) => getProductBody(product, pattern, index, basket)).join('');
};

export const scriptSetFormValues = `const fields = {apartment: '10',comment: 'aaa',house: '9',name: 'aa',phone: '89999999999',street: 'aa'};Object.keys(fields).forEach(key => document.forms[0].elements[key].value = fields[key])`;

/**
 * Получение списка действий
 * @param code
 */
export const getActionListText = (code: string) =>
    `=================================\n<b>Список действий:</b>\n<i>1. Перейти по ссылке https://nyam-nyam.online/basket/</i>\n<i>2. После загрузки страницы открыть консоль через F12 далее раздел консоль</i>\n<i>3. Вставить этот скрипт в консоль и нажать Enter\n<code>${code}</code>\n</i>\n<i>3. Для заполнения формы оформления заказа вставте этот скрипт и нажмите Enter\n<code>${scriptSetFormValues}</code>\n</i>\n`;

/**
 * Получение тела общей корзины
 * @param products
 */
export const getFoodBasketItemsList = (products: { user: UserType; addedProducts: AddedProduct[] }[]) =>
    `<b>Общий список заказа:</b>\n\n${products
        .map(
            (item) =>
                `<b>Заказ от ${item.user.firstName} - ${getTotalPrice(item.addedProducts)}₽:</b>\n${item.addedProducts
                    .map((product) => `<i>${product.title} - ${product.count} шт</i>\n`)
                    .join('')}\n`,
        )
        .join('')}`;

type ProductCallbackType = (
    product: ProductType,
) => (addedProducts: Map<number, AddedProduct>) => Map<number, AddedProduct>;

/**
 * Callback добавление продукта в корзину
 * @param product
 */
export const addProductCallback: ProductCallbackType = (product) => (addedProducts) => {
    const newAddedProducts = new Map(addedProducts);

    if (newAddedProducts.has(product.pk)) {
        const addedProduct = newAddedProducts.get(product.pk) as AddedProduct;

        addedProduct.count += 1;
    } else {
        newAddedProducts.set(product.pk, { ...product, count: 1, id: product.pk });
    }

    return newAddedProducts;
};

/**
 * Callback удаление продукта из корзины
 * @param product
 */
export const removeProductCallback: ProductCallbackType = (product) => (addedProducts) => {
    const addedProduct = addedProducts.get(product.pk);

    if (addedProduct === undefined) {
        return addedProducts;
    }

    const newAddedProducts = new Map(addedProducts);

    addedProduct.count -= 1;

    if (addedProduct.count === 0) {
        newAddedProducts.delete(product.pk);
    }

    return newAddedProducts;
};

/**
 * Callback Получение и сохранение продуктов с запроса
 * @param products
 * @param setStatus
 * @param setProducts
 */
export const fetchProductCallback = (
    products: ProductType[],
    setStatus: (value: StatusEnum) => void,
    setProducts: (p: ProductType[]) => void,
) =>
    (async () => {
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
    })();
