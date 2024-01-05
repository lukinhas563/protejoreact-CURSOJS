import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import App from './App'

import Alunos from './pages/Alunos/index'
import Register from './pages/Register/index'
import Login from './pages/Login/index'
import Aluno from './pages/Aluno/index'
import Fotos from './pages/Fotos/index'
import Page404 from './pages/Page404/index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <Alunos isCloseds={false} />,
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
