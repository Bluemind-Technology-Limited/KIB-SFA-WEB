import type { ProductRequest, RequestStatus } from '../types/domain';
import { requests } from './mockDb';
import { delay, clone } from './mockHelpers';

export interface ReviewDecision {
  status: Exclude<RequestStatus, 'PENDING'>;
  notes?: string;
}

/** Simulated request API — the Super Admin sees requests across all distributors. */
export const requestService = {
  async list(): Promise<ProductRequest[]> {
    await delay();
    return clone([...requests].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
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
