import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsCircleFill,
  BsFillTrashFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/todos/get")
      .then((response) => {
        setTodos(response.data); // Assuming setTodos is a state setter function
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  //Handle Edit
  const handleEdit = (id) => {
    axios
      .put("http://localhost:8080/todos/update/" + id)
      .then((response) => {
       location.reload()
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };
  //Delete
  const handleDelete=(id)=>{
    axios
    .delete("http://localhost:8080/todos/delete/" + id)
    .then((response) => {
     location.reload();
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
    });
  }

  return (
    <div className="home">
      <h2>To Do List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>No To Do Present</div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill  className="icon"/>
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}> {todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill className="icon" onClick={()=>handleDelete(todo._id)} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
