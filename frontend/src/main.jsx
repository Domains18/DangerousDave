import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Update from './pages/Update'
import Add from './pages/Add'
import Books from './pages/Books'


import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/books',
    element: <Books />,
  },
  {
    path: 'add',
    element: <Add />,
  },
  {
    path: 'update',
    element: <Update />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </RouterProvider>
)
