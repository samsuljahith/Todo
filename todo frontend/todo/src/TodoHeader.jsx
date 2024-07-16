import React, { useState } from 'react'

const TodoHeader = () => {
    const [title,setTitle]=useState()
    const [description,setDescription]=useState()   
    const [todo,setTodo]=useState([])
   const apiUrl ="http://localhost:3000"
    const handleSubmit =()=>{
        if(title.trim()!=="" && description.trim()!==""){
            fetch(apiUrl+"/todo", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, description})
            }).then(()=>{
                setTodo([...todo,{title,description}])
            })
          
        }
    }
  return (
    <>
     <div className="row p-3 bg-success text-light">
     <h1>Todo Project With MERN Stack</h1> </div>
     <div className='row'>
        <h3>Add Item</h3>
        <p className='text-success'>item added successfully</p>
        <div className='form-group d-flex gap-2'>
            <input type="text" placeholder='Title'onChange={(e)=>{setTitle(e.target.value)}} value={title}className='form-control' /> 
            <input type="text" placeholder='description'onChange={(e)=>{setDescription(e.target.value)}} value={description}className='form-control' />
            <button className='btn btn-dark' onClick={handleSubmit}>Submit</button>
        </div>

     </div>
    </>

  )
}

export default TodoHeader