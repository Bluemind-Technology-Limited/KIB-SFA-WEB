import type { Distributor, Product, ProductRequest, User } from '../types/domain';

/**
 * Simulated in-memory database for the Super Admin dashboard.
 *
 * The backend is not available yet, so the admin frontend runs against this
 * local dataset covering distributors, sales users, products and requests.
 * When the real API lands this module is replaced by HTTP clients.
 */

const counter: Record<string, number> = {};
export function mockId(prefix: string): string {
  counter[prefix] = (counter[prefix] ?? 0) + 1;
  return `${prefix}_${Date.now().toString(36)}_${counter[prefix]}`;
}

function daysAgo(n: number): string {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();
}

export const distributors: Distributor[] = [
  { id: 'dist_1', name: 'KIB Lagos Distribution', email: 'lagos@kibgroup.app', phone: '+234 801 234 5678', location: 'Lagos, NG', address: '14 Wharf Road, Apapa, Lagos', isActive: true, createdAt: daysAgo(120) },
  { id: 'dist_2', name: 'KIB Abuja Logistics', email: 'abuja@kibgroup.app', phone: '+234 802 345 6789', location: 'Abuja, NG', address: 'Plot 5, Gwarinpa, Abuja', isActive: true, createdAt: daysAgo(110) },
  { id: 'dist_3', name: 'KIB Port Harcourt Hub', email: 'phc@kibgroup.app', phone: '+234 803 456 7890', location: 'Port Harcourt, NG', address: '22 Trans-Amadi, Rivers', isActive: false, createdAt: daysAgo(95) },
];

export const users: User[] = [
  {
    id: 'admin_1',
    role: 'SUPER_ADMIN',
    fullName: 'Japheth Jerry',
    email: 'admin@kibgroup.app',
    password: 'password',
    distributorId: null,
    isActive: true,
    createdAt: daysAgo(150),
  },
  {
    id: 'sales_1',
    role: 'SALES',
    fullName: 'Amara Okafor',
    email: 'amara@kibgroup.app',
    password: 'password',
    distributorId: 'dist_1',
    isActive: true,
    phone: '+234 802 111 2233',
    createdAt: daysAgo(80),
  },
  {
    id: 'sales_2',
    role: 'SALES',
    fullName: 'Tunde Adeyemi',
    email: 'tunde@kibgroup.app',
    password: 'password',
    distributorId: 'dist_1',
    isActive: true,
    phone: '+234 803 222 3344',
    createdAt: daysAgo(75),
  },
  {
    id: 'sales_3',
    role: 'SALES',
    fullName: 'Chinedu Eze',
    email: 'chinedu@kibgroup.app',
    password: 'password',
    distributorId: 'dist_1',
    isActive: true,
    phone: '+234 804 333 4455',
    createdAt: daysAgo(72),
  },
  {
    id: 'sales_4',
    role: 'SALES',
    fullName: 'Zainab Bello',
    email: 'zainab@kibgroup.app',
    password: 'password',
    distributorId: 'dist_2',
    isActive: true,
    phone: '+234 805 444 5566',
    createdAt: daysAgo(60),
  },
  {
    id: 'sales_5',
    role: 'SALES',
    fullName: 'Emeka Nwosu',
    email: 'emeka@kibgroup.app',
    password: 'password',
    distributorId: 'dist_2',
    isActive: false,
    phone: '+234 806 555 6677',
    createdAt: daysAgo(50),
  },
];

export const products: Product[] = [
  { id: 'prod_1', name: 'Star Lager', sku: 'STAR-LGR-500', description: '500ml premium lager beer', unit: 'Crate', price: 7200, stock: 240, isActive: true, createdAt: daysAgo(80) },
  { id: 'prod_2', name: 'Guilder Stout', sku: 'GUILD-ST-600', description: '600ml rich stout beer', unit: 'Crate', price: 8800, stock: 150, isActive: true, createdAt: daysAgo(80) },
  { id: 'prod_3', name: '33 Export', sku: 'EXP33-330', description: '330ml export lager', unit: 'Crate', price: 6900, stock: 300, isActive: true, createdAt: daysAgo(75) },
  { id: 'prod_4', name: 'Legend Stout', sku: 'LEG-ST-600', description: '600ml extra stout', unit: 'Crate', price: 9100, stock: 95, isActive: true, createdAt: daysAgo(70) },
  { id: 'prod_5', name: 'Desperados', sku: 'DESP-330', description: '330ml tequila flavoured beer', unit: 'Crate', price: 10800, stock: 60, isActive: false, createdAt: daysAgo(65) },
  { id: 'prod_6', name: 'BK Malt (1L)', sku: 'BK-MLT-1000', description: '1L non-alcoholic malt', unit: 'Pack', price: 2400, stock: 420, isActive: true, createdAt: daysAgo(40) },
  { id: 'prod_7', name: 'Breezer', sku: 'BZR-330', description: '330ml flavoured malt cooler', unit: 'Crate', price: 8500, stock: 130, isActive: true, createdAt: daysAgo(30) },
];

export const requests: ProductRequest[] = [
  {
    id: 'req_1',
    salesUserId: 'sales_1',
    salesUserName: 'Amara Okafor',
    distributorId: 'dist_1',
    distributorName: 'KIB Lagos Distribution',
    status: 'PENDING',
    items: [
      { productId: 'prod_1', productName: 'Star Lager', unit: 'Crate', price: 7200, quantity: 20 },
      { productId: 'prod_6', productName: 'BK Malt (1L)', unit: 'Pack', price: 2400, quantity: 40 },
    ],
    totalAmount: 240000,
    createdAt: daysAgo(0),
  },
  {
    id: 'req_2',
    salesUserId: 'sales_2',
    salesUserName: 'Tunde Adeyemi',
    distributorId: 'dist_1',
    distributorName: 'KIB Lagos Distribution',
    status: 'APPROVED',
    items: [{ productId: 'prod_2', productName: 'Guilder Stout', unit: 'Crate', price: 8800, quantity: 12 }],
    totalAmount: 105600,
    createdAt: daysAgo(2),
    reviewedAt: daysAgo(1),
  },
  {
    id: 'req_3',
    salesUserId: 'sales_3',
    salesUserName: 'Chinedu Eze',
    distributorId: 'dist_1',
    distributorName: 'KIB Lagos Distribution',
    status: 'REJECTED',
    items: [{ productId: 'prod_5', productName: 'Desperados', unit: 'Crate', price: 10800, quantity: 8 }],
    totalAmount: 86400,
    notes: 'Out of stock at the moment.',
    createdAt: daysAgo(4),
    reviewedAt: daysAgo(3),
  },
  {
    id: 'req_4',
    salesUserId: 'sales_4',
    salesUserName: 'Zainab Bello',
    distributorId: 'dist_2',
    distributorName: 'KIB Abuja Logistics',
    status: 'PENDING',
    items: [
      { productId: 'prod_3', productName: '33 Export', unit: 'Crate', price: 6900, quantity: 25 },
      { productId: 'prod_7', productName: 'Breezer', unit: 'Crate', price: 8500, quantity: 10 },
    ],
    totalAmount: 257500,
    createdAt: daysAgo(1),
  },
  {
    id: 'req_5',
    salesUserId: 'sales_4',
    salesUserName: 'Zainab Bello',
    distributorId: 'dist_2',
    distributorName: 'KIB Abuja Logistics',
    status: 'APPROVED',
    items: [{ productId: 'prod_4', productName: 'Legend Stout', unit: 'Crate', price: 9100, quantity: 15 }],
    totalAmount: 136500,
    createdAt: daysAgo(6),
    reviewedAt: daysAgo(5),
  },
];
