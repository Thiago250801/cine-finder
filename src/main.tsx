import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Movies from './pages/movies'
import Series from './pages/series'
import Home from './pages/home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {index: true,
        element: <Home />
      },
      {
        path: "movies",
        element: <Movies />
      },
      {
        path: "series",
        element: <Series />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)