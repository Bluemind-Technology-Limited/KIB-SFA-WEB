import type { Distributor } from '../types/domain';
import * as db from './mockDb';
import { delay, clone, mockError } from './mockHelpers';

export interface DistributorInput {
  name: string;
  email: string;
  phone: string;
  location: string;
  address: string;
}

/** Simulated CRUD for distributors (Super Admin). */
export const distributorService = {
  async list(): Promise<Distributor[]> {
    await delay();
    return clone(db.distributors);
  },

  async create(input: DistributorInput): Promise<Distributor> {
    await delay(500);
    if (!input.name.trim()) mockError('Distributor name is required.');
    const distributor: Distributor = {
      id: db.mockId('dist'),
      ...clone(input),
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    db.distributors.unshift(distributor);
    return clone(distributor);
  },

  async update(id: string, input: Partial<DistributorInput>): Promise<Distributor> {
    await delay(500);
    const distributor = db.distributors.find((d) => d.id === id);
    if (!distributor) mockError('Distributor not found.');
    Object.assign(distributor, input);
    return clone(db.distributors.find((d) => d.id === id)!);
  },

  async toggleActive(id: string): Promise<Distributor> {
    await delay(400);
    const distributor = db.distributors.find((d) => d.id === id);
    if (!distributor) mockError('Distributor not found.');
    distributor.isActive = !distributor.isActive;
    return clone(distributor);
  },

  async salesCount(id: string): Promise<number> {
    await delay(120);
    return db.users.filter((u) => u.role === 'SALES' && u.distributorId === id).length;
  },
};
