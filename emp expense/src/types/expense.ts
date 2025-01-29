export type ExpenseStatus = 'draft' | 'pending' | 'approved' | 'rejected';
export type WorkflowLevel = 'manager' | 'director' | 'finance';

export interface Expense {
  id: string;
  employeeId: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  status: ExpenseStatus;
  currentLevel: WorkflowLevel;
  attachments: string[];
  comments: Comment[];
  history: WorkflowHistory[];
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
}

export interface WorkflowHistory {
  level: WorkflowLevel;
  status: ExpenseStatus;
  userId: string;
  timestamp: string;
  comment?: string;
}