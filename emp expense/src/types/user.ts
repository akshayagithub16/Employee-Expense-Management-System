export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'manager' | 'director' | 'finance';
  profilePic?: string;
}

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
}