import type { User } from '../types/domain';
import * as db from './mockDb';
import { delay, clone } from './mockHelpers';

export type SalesMember = User;

/**
 * Simulated sales-team API scoped to a distributor.
 * Mirrors future `GET /distributors/:id/sales-users`.
 */
export const salesTeamService = {
  async list(distributorId: string): Promise<SalesMember[]> {
    await delay();
    return clone(db.users.filter((u) => u.role === 'SALES' && u.distributorId === distributorId));
  },

  /** Active product catalogue the sales team can request from. */
  async products(): Promise<typeof db.products> {
    await delay();
    return clone(db.products.filter((p) => p.isActive));
  },
};
