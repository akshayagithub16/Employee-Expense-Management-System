import React from 'react';
import { useExpenseStore } from '../store/expenseStore';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface ExpenseListProps {
  type: 'draft' | 'pending' | 'all';
  level?: 'manager' | 'director' | 'finance';
}

export function ExpenseList({ type, level }: ExpenseListProps) {
  const expenses = useExpenseStore((state) =>
    type === 'draft'
      ? state.getDraftExpenses()
      : type === 'pending' && level
      ? state.getPendingExpenses(level)
      : state.expenses
  );

  const updateExpenseStatus = useExpenseStore((state) => state.updateExpenseStatus);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const handleApprove = (id: string) => {
    const nextLevel = level === 'manager' ? 'director' : level === 'director' ? 'finance' : undefined;
    updateExpenseStatus(
      id,
      nextLevel ? 'pending' : 'approved',
      nextLevel || 'finance',
      'Approved'
    );
  };

  const handleReject = (id: string) => {
    updateExpenseStatus(id, 'rejected', level || 'manager', 'Rejected');
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {type === 'draft' ? 'Draft Expenses' : type === 'pending' ? 'Pending Approval' : 'All Expenses'}
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <li key={expense.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {expense.category} - ${expense.amount}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      {getStatusIcon(expense.status)}
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {expense.description}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        {format(new Date(expense.date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
                {type === 'pending' && level && (
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <button
                      onClick={() => handleApprove(expense.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(expense.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}