import { ProductItem } from '../types';

export const formatBookPrice = (product: Pick<ProductItem, 'price' | 'currencySymbol' | 'isFree'>): string => {
  if (product.isFree || product.price <= 0) {
    return 'Free';
  }
  const symbol = product.currencySymbol || '₦';
  return `${symbol}${product.price.toLocaleString()}`;
};
