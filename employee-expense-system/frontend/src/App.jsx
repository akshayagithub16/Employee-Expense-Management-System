import React, { useState, useEffect } from "react";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      // placeholder for user fetch if needed
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="container">
      <h1>Employee Expense Manager</h1>
      {token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <ExpenseForm token={token} />
          <ExpenseList token={token} />
        </>
      ) : (
        <>
          <Register onSuccess={(t) => { setToken(t); localStorage.setItem("token", t); }} />
          <Login onSuccess={(t) => { setToken(t); localStorage.setItem("token", t); }} />
        </>
      )}
    </div>
  );
}

export default App;