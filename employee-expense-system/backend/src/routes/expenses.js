import express from "express";
import { pool } from "../db.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// list
router.get("/", authenticate, async (req, res) => {
  try {
    const [expenses] = await pool.query(
      "SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC",
      [req.user.id]
    );
    res.json({ expenses });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// create
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    if (!title || !amount || !category || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [result] = await pool.query(
      \`INSERT INTO expenses (user_id, title, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)\`,
      [req.user.id, title, parseFloat(amount), category, description || "", date]
    );
    const insertedId = result.insertId;
    const [rows] = await pool.query("SELECT * FROM expenses WHERE id = ?", [insertedId]);
    res.status(201).json({ expense: rows[0] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// update
router.put("/:id", authenticate, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { title, amount, category, description, date } = req.body;

    const [existing] = await pool.query("SELECT * FROM expenses WHERE id = ? AND user_id = ?", [
      expenseId,
      req.user.id
    ]);
    if (!existing.length) return res.status(404).json({ error: "Not found" });

    await pool.query(
      \`UPDATE expenses SET title=?, amount=?, category=?, description=?, date=? WHERE id=?\`,
      [title, parseFloat(amount), category, description || "", date, expenseId]
    );
    const [updated] = await pool.query("SELECT * FROM expenses WHERE id = ?", [expenseId]);
    res.json({ expense: updated[0] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// delete
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const [existing] = await pool.query("SELECT * FROM expenses WHERE id = ? AND user_id = ?", [
      expenseId,
      req.user.id
    ]);
    if (!existing.length) return res.status(404).json({ error: "Not found" });

    await pool.query("DELETE FROM expenses WHERE id = ?", [expenseId]);
    res.json({ message: "Deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
