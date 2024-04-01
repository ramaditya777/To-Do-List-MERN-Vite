import express from "express";
import TodoModel from "../Model/todoModel.js";

//Create Router object
const router = express.Router();

// Routes for get

router.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => {
      res.json(result); // Send the array of tasks as a JSON response
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Send an error response if there's a problem
    });
});

//Routes for add
router.post("/add", (req, res) => {
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
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
//Route for Delte
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

export default router;
