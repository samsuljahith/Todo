import React, { useEffect, useState } from 'react';

const TodoHeader = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const apiUrl = "http://localhost:3000";

  const handleSubmit = async () => {
    setError("");
    if (title.trim() !== "" && description.trim() !== "") {
      try {
        const response = await fetch(apiUrl + "/todo", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, description })
        });

        if (response.ok) {
          const newTodo = await response.json();
          setTodos([...todos, newTodo]);
          setTitle("");
          setDescription("");
          setMessage("Item added successfully");
          setTimeout(() => {
            setMessage("");
          }, 2000);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to add item. Please try again.");
        }
      } catch (error) {
        setError("An error occurred while creating the todo item.");
        console.error("Error creating todo:", error);
      }
    } else {
      setError("Title and Description cannot be empty.");
    }
  };
 const handledelete = async()=>{
  try {
    const response = await fetch(apiUrl + "/todo/:id", {
      method: 'DELETE',
    });
    if (response.ok) {
      const deletedTodo = await response.json();
      setTodos(todos.filter(todo => todo._id !== deletedTodo._id));
      setMessage("Item deleted successfully");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      const errorData = await response.json();
      setError(errorData.error || "Failed to delete item. Please try again.");
    }
  } catch (error) {
    setError("An error occurred while deleting the todo item.");
    console.error("Error deleting todo:", error);
  }
 }
 const handleedit = async()=>{
  try {
    const response = await fetch(apiUrl + "/todo/:id", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    });
    if (response.ok) {
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo));
      setMessage("Item updated successfully");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      const errorData = await response.json();
      setError(errorData.error || "Failed to update item. Please try again.");
    }
  } catch (error) {
    setError("An error occurred while updating the todo item.");
    console.error("Error updating todo:", error);
  }
 }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + "/todo");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="row p-3 bg-success text-light">
        <h1>Todo Project With MERN Stack</h1>
      </div>
      <div className='row'>
        <h3>Add Item</h3>
        {message && <p className='text-success'>{message}</p>}
        <div className='form-group d-flex gap-2'>
          <input
            type="text"
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className='form-control'
          />
          <input
            type="text"
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className='form-control'
          />
          <button className='btn btn-dark' onClick={handleSubmit}>Submit</button>
        </div>
        {error && <p className='text-danger'>{error}</p>}
      </div>
      <div className='row'>
        <h3>My Todos</h3>
        <ul className='list-group'>
          {todos.map((item, index) => (
            <li key={index} className='list-group-item bg-info d-flex justify-content-between align-items-center my-2'>
              <div className='d-flex flex-column'>
                <span className='fw-bold'>{item.title}</span>
                <span>{item.description}</span>
              </div>
              <div className='d-flex gap-2'>
                <button className='btn btn-danger' onClick={handledelete}>Delete</button>
                <button className='btn btn-warning'onClick={handleedit}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoHeader;
