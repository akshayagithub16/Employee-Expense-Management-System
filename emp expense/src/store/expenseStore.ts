import { create } from 'zustand';
import { Expense, ExpenseStatus, WorkflowLevel } from '../types/expense';

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpenseStatus: (id: string, status: ExpenseStatus, level: WorkflowLevel, comment?: string) => void;
  getDraftExpenses: () => Expense[];
  getPendingExpenses: (level: WorkflowLevel) => Expense[];
}

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
  expenses: [],
  
  addExpense: (expense) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    set((state) => ({ expenses: [...state.expenses, newExpense] }));
  },

  updateExpenseStatus: (id, status, level, comment) => {
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              status,
              currentLevel: level,
              history: [
                ...expense.history,
                {
                  level,
                  status,
                  userId: 'current-user', // In a real app, get from auth context
                  timestamp: new Date().toISOString(),
                  comment,
                },
              ],
            }
          : expense
      ),
    }));
  },

  getDraftExpenses: () => {
    return get().expenses.filter((expense) => expense.status === 'draft');
  },

  getPendingExpenses: (level) => {
    return get().expenses.filter(
      (expense) => expense.status === 'pending' && expense.currentLevel === level
    );
  },
}));