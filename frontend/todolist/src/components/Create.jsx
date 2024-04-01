import React, { useState } from 'react'
import '../components/Create.css'
import axios from 'axios';

const Create = () => {
  const [task, setTask] = useState(''); // Providing a default value for task

  const handleAdd = () => {
    axios.post('http://127.0.0.1:8080/todos/add', { task: task })
      .then(result => location.reload())
      .catch(err => console.log(err))
  }

  return (
    <div className="create_form">
      <input type="text" placeholder='Enter Task' onChange={(e) => setTask(e.target.value)} />
      <button type='button' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create;
