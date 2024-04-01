import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import TodoModel from "./Model/todoModel.js";
//express object
const app = express();

// Configure dotenv to load environment variables from .env file
dotenv.config();

//Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/todoDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes for get
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => {
      res.json(result); // Send the array of tasks as a JSON response
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Send an error response if there's a problem
    });
});

//Routes for add
app.post("/add", (req, res) => {
  const { task } = req.body;

  // Create a new TodoModel instance with the received task
  const newTodo = new TodoModel({ task });

  // Save the newTodo document to the database
  newTodo
    .save()
    .then((result) => {
      // If save operation is successful, send the saved document as JSON response
      res.json(result);
    })
    .catch((err) => {
      // If there's an error during save operation, send the error as JSON response
      res.status(500).json({ error: err.message });
    });
});

//Route for update
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
//Route for Delte
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Example: accessing a PORT environment variable
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
