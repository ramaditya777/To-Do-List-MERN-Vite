import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import connectDB from "./DB/todoDB.js";
//express object
const app = express();

// Configure dotenv to load environment variables from .env file
dotenv.config();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/todos", router);

// Connect to MongoDB
connectDB();

// Example: accessing a PORT environment variable
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
