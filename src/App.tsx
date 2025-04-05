import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router'

function App() {
  return (
    <div className="bg-gray-800 min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App