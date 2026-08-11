import type { User } from '../types/domain';
import * as db from './mockDb';
import { delay, clone, mockError } from './mockHelpers';

export interface SalesUserInput {
  fullName: string;
  email: string;
  phone?: string;
  distributorId: string | null;
  password: string;
}

/** Simulated CRUD for sales users (Super Admin). */
export const salesUserService = {
  async list(): Promise<User[]> {
    await delay();
    return clone(db.users.filter((u) => u.role === 'SALES'));
  },

  async create(input: SalesUserInput): Promise<User> {
    await delay(500);
    if (!input.fullName.trim() || !input.email.trim()) {
      mockError('Name and email are required.');
    }
    if (db.users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) {
      mockError('A sales user with this email already exists.');
    }
    const user: User = {
      id: db.mockId('sales'),
      role: 'SALES',
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone,
      distributorId: input.distributorId,
      password: input.password || 'password',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    db.users.unshift(user);
    return clone(user);
  },

  async update(id: string, input: Partial<SalesUserInput>): Promise<User> {
    await delay(500);
    const user = db.users.find((u) => u.id === id);
    if (!user) mockError('Sales user not found.');
    Object.assign(user, input);
    return clone(db.users.find((u) => u.id === id)!);
  },

  async toggleActive(id: string): Promise<User> {
    await delay(400);
    const user = db.users.find((u) => u.id === id);
    if (!user) mockError('Sales user not found.');
    user.isActive = !user.isActive;
    return clone(user);
  },

  async assignDistributor(id: string, distributorId: string | null): Promise<User> {
    await delay(400);
    const user = db.users.find((u) => u.id === id);
    if (!user) mockError('Sales user not found.');
    user.distributorId = distributorId;
    return clone(user);
  },
};
