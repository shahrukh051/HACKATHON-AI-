import { simulate } from '@/lib/mockClient';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

const mockUser: AuthUser = {
  id: 'user_001',
  name: 'Shahrukh',
  email: 'shahrukhstudy051@gmail.com',
};

export async function getCurrentUser(): Promise<AuthUser | null> {
  return simulate(mockUser, { minMs: 200, maxMs: 400 });
}

export async function login(email: string, password: string): Promise<AuthUser> {
  return simulate(mockUser, { minMs: 500, maxMs: 900 });
}

export async function logout(): Promise<void> {
  return simulate(undefined, { minMs: 200, maxMs: 400 });
}
