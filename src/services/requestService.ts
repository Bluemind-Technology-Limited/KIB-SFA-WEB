import type { ProductRequest, RequestStatus } from '../types/domain';
import { requests } from './mockDb';
import { delay, clone } from './mockHelpers';

export interface ReviewDecision {
  status: Exclude<RequestStatus, 'PENDING'>;
  notes?: string;
}

/**
 * Simulated request API. Without a distributorId the Super Admin sees every
 * request across all distributors; with one, only that distributor's requests
 * are returned. Mirrors future `GET /requests`, `PATCH /requests/:id`.
 */
export const requestService = {
  async list(distributorId?: string): Promise<ProductRequest[]> {
    await delay();
    const scoped = distributorId
      ? requests.filter((r) => r.distributorId === distributorId)
      : [...requests];
    return clone(scoped.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  },

  async getById(id: string): Promise<ProductRequest | undefined> {
    await delay();
    return clone(requests.find((r) => r.id === id));
  },

  async review(id: string, decision: ReviewDecision): Promise<ProductRequest> {
    await delay(500);
    const request = requests.find((r) => r.id === id);
    if (!request) throw new Error('Request not found.');
    request.status = decision.status;
    request.reviewedAt = new Date().toISOString();
    request.notes = decision.notes || request.notes;
    return clone(request);
  },
};
