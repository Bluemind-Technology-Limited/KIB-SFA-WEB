import type { AdminMetrics } from '../types/domain';
import { distributors, requests, users, products } from './mockDb';
import { delay, clone } from './mockHelpers';

/** Simulated Super Admin dashboard metrics across the whole platform. */
export async function fetchAdminMetrics(): Promise<AdminMetrics> {
  await delay();
  const metrics: AdminMetrics = {
    totalDistributors: distributors.length,
    totalSales: users.filter((u) => u.role === 'SALES').length,
    totalProducts: products.length,
    pendingRequests: requests.filter((r) => r.status === 'PENDING').length,
    approvedRequests: requests.filter((r) => r.status === 'APPROVED').length,
    rejectedRequests: requests.filter((r) => r.status === 'REJECTED').length,
  };
  return clone(metrics);
}
