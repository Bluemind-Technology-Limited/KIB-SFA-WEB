import type { User } from '../types/domain';
import { users } from './mockDb';
import { delay, clone, mockError } from './mockHelpers';

export interface LoginResult {
  user: User;
}

export interface Credentials {
  email: string;
  password: string;
}

/**
 * Authenticate a Super Admin or Distributor account against the simulated
 * store. Mirrors the future `POST /auth/login` + `GET /auth/me` flow; the
 * returned role drives which dashboard the user lands in.
 */
export async function loginAction({ email, password }: Credentials): Promise<LoginResult> {
  await delay(600);
  const found = users.find(
    (u) =>
      u.email.toLowerCase() === email.trim().toLowerCase() &&
      (u.role === 'DISTRIBUTOR' || u.role === 'SUPER_ADMIN')
  );
  if (!found || found.password !== password) {
    mockError('Invalid email or password.');
  }
  if (!found.isActive) {
    mockError('This account has been deactivated. Contact support.');
  }
  return { user: clone(found) };
}
