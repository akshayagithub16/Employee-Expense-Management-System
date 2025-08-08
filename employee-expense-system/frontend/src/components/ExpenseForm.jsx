import React, { useState } from "react";
import { API_BASE } from "../config.js";

export default function ExpenseForm({ token }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, amount, category, date, description })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      alert("Expense added");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="card">
      <h3>Add Expense</h3>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input
        placeholder="Amount"
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}