import express from "express";
import {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

// Routes
router.get("/get", getAllTodos);
router.post("/add", addTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
