import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        throw new Error(error)
      }
    }
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      window.location.reload()
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div>
      <div className="title">
        <h1>Bookshop api</h1>
        <div className="button">
          <button>
            <Link to="/add" className='link'>Add New book</Link>
          </button>
          <br />
        </div>
        <div className="books">
          {books.map((book) => (
            <div className="book" key={book.id}>
              {book.cover && <img src={book.cover} alt="" />}
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>$ {book.price}</span>
              <div className="options">
                <button className='delete' onClick={() => handleDelete(book.id)} >
                  Delete book
                </button>
                <br />
                <button className="update">
                  <Link className='link-update' to={`/update/${book.id}`}>Update</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Books
