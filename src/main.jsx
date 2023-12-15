import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import App from './App.jsx'

import Alunos from './pages/Alunos/index.jsx'
import Register from './pages/Register/index.jsx'
import Login from './pages/Login/index.jsx'
import Aluno from './pages/Aluno/index.jsx'
import Fotos from './pages/Fotos/index.jsx'
import Page404 from './pages/Page404/index.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <Alunos isClosed={false} />,
      },
      {
        path: '/register',
        element: <Register isClosed={false} />
      },
      {
        path: '/login',
        element: <Login isClosed={false} />
      },
      {
        path: '/fotos/:id',
        element: <Fotos isClosed={true} />
      },
      {
        path: '/aluno',
        element: <Aluno isClosed={true} />,
        children: [
          {
            path: '/aluno/:id',
            element: <Aluno isClosed={true} />,
            children: [
              {
                path: '/aluno/:id/edit',
                element: <Aluno isClosed={true} />
              }
            ]
          }
        ]
      },
      {
        path: 'oldcontact',
        element: <Navigate to={'/'} />
      }
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
