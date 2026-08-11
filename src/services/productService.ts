import type { Product } from '../types/domain';
import * as db from './mockDb';
import { delay, clone, mockError } from './mockHelpers';

export interface ProductInput {
  name: string;
  sku: string;
  description: string;
  unit: string;
  price: number;
  stock: number;
}

/** Simulated CRUD for products (Super Admin). */
export const productService = {
  async list(): Promise<Product[]> {
    await delay();
    return clone(db.products);
  },

  async create(input: ProductInput): Promise<Product> {
    await delay(500);
    if (!input.name.trim() || !input.sku.trim()) {
      mockError('Product name and SKU are required.');
    }
    const product: Product = {
      id: db.mockId('prod'),
      ...clone(input),
      description: input.description.trim(),
      price: Number(input.price) || 0,
      stock: Number(input.stock) || 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    db.products.unshift(product);
    return clone(product);
  },

  async update(id: string, input: Partial<ProductInput>): Promise<Product> {
    await delay(500);
    const product = db.products.find((p) => p.id === id);
    if (!product) mockError('Product not found.');
    Object.assign(product, input);
    return clone(db.products.find((p) => p.id === id)!);
  },

  async toggleActive(id: string): Promise<Product> {
    await delay(400);
    const product = db.products.find((p) => p.id === id);
    if (!product) mockError('Product not found.');
    product.isActive = !product.isActive;
    return clone(product);
  },
};
