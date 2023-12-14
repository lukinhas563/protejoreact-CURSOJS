import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import App from './App.jsx'
import Login from './pages/Login/index.jsx'
import Contato from './pages/Contact/index.jsx'
import Home from './pages/Home/index.jsx'
import Page404 from './pages/Page404/index.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/contato',
        element: <Contato isClosed />
      },
      {
        path: 'oldcontact',
        element: <Navigate to={'/'} />
      }
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
