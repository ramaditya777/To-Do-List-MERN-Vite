import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true,
  },
  done: { type: Boolean, default: false },
});

const TodoModel = mongoose.model("todos", todoSchema);

export default TodoModel;
