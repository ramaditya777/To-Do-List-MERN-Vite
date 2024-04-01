import TodoModel from "../Model/todoModel.js";

// Function to get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to add a new todo
const addTodo = async (req, res) => {
  const { task } = req.body;
  try {
    const newTodo = await TodoModel.create({ task });
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to update a todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { done: true },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllTodos, addTodo, updateTodo, deleteTodo };
