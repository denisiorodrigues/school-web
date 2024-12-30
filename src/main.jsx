import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './global.css'

import Login from './pages/login'
import Students from './pages/students'
import NewStudent from './pages/newStudent'
import EditStudent from './pages/editStudent'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'students',
    element: <Students />,
  },
  {
    path: 'students/new',
    element: <NewStudent />,
  },
  {
    path: 'students/edit/:studentId',
    element: <EditStudent />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
