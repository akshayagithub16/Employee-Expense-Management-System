import React, { useEffect, useState } from "react";
import { API_BASE } from "../config.js";

export default function ExpenseList({ token }) {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${API_BASE}/expenses`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setExpenses(data.expenses);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchExpenses();
  }, [token]);

  return (
    <div className="card">
      <h3>Your Expenses</h3>
      {expenses.length === 0 && <p>No expenses yet.</p>}
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            <strong>{e.title}</strong> - ₹{e.amount} - {e.category} - {new Date(e.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}