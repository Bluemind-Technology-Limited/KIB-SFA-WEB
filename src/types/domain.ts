/**
 * Core Sales Force Automation domain types for the Super Admin dashboard.
 * These cover the full management surface: distributors, sales users,
 * products and cross-platform requests.
 */

export type UserRole = 'SALES' | 'DISTRIBUTOR' | 'SUPER_ADMIN';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface User {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  password: string;
  distributorId: string | null;
  isActive: boolean;
  phone?: string;
  createdAt: string;
}

export interface Distributor {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  isActive: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  unit: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
}

export interface RequestItem {
  productId: string;
  productName: string;
  unit: string;
  price: number;
  quantity: number;
}

export interface ProductRequest {
  id: string;
  salesUserId: string;
  salesUserName: string;
  distributorId: string;
  distributorName: string;
  status: RequestStatus;
  items: RequestItem[];
  totalAmount: number;
  notes?: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface AdminMetrics {
  totalDistributors: number;
  totalSales: number;
  totalProducts: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
}
