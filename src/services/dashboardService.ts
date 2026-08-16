import type { AdminMetrics, DashboardMetrics } from '../types/domain';
import { distributors, requests, users, products } from './mockDb';
import { delay, clone } from './mockHelpers';

/** Simulated platform-wide metrics for the Super Admin dashboard. */
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

/** Simulated metrics scoped to a distributor. Mirrors future `GET /metrics/dashboard`. */
export async function fetchDistributorMetrics(distributorId: string): Promise<DashboardMetrics> {
  await delay();
  const mine = requests.filter((r) => r.distributorId === distributorId);
  const metrics: DashboardMetrics = {
    totalSales: users.filter((u) => u.role === 'SALES' && u.distributorId === distributorId).length,
    pendingRequests: mine.filter((r) => r.status === 'PENDING').length,
    approvedRequests: mine.filter((r) => r.status === 'APPROVED').length,
    rejectedRequests: mine.filter((r) => r.status === 'REJECTED').length,
    totalRequests: mine.length,
  };
  return clone(metrics);
}
