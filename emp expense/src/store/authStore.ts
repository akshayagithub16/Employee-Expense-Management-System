import { create } from 'zustand';
import { AuthStore, User } from '../types/user';

export const useAuthStore = create<AuthStore & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // In a real app, this would make an API call
    const mockUser: User = {
      id: '1',
      email,
      name: 'John Doe',
      role: 'employee',
      profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    };
    set({ user: mockUser, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));