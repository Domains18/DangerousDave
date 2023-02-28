import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Update = () => {

  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: " ",
    desc: " ",
    price: null,
    cover: " "
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/books", input)
      navigate("/books")
    } catch (error) {
      console.log(error)
    }
  }

  console.log(input)

  return (
    <div className='form'>
      <h1>Update Book</h1>
      <input type="text" placeholder='title' onChange={handleChange} name='title' />
      <input type="text" placeholder='desc' onChange={handleChange} name='desc' />
      <input type="text" placeholder='cover' onChange={handleChange} name="cover" />
      <input type="number" placeholder='price' onChange={handleChange} name='price' />
      <button onClick={handleSubmit} className='update-button'>Add</button>
    </div>
  )
}

export default Update
