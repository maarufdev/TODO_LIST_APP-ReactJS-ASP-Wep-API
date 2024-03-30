import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Col, Row } from 'react-bootstrap'
import Header from './component/Header'
import TodoPage from './pages/TodoPage'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './routing/ProtectedRoute'

function App() {

  return (
    <>
      <Router>
        <Header />
        <main className='p-2'>
          <Routes>

            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route index path="/" element={<TodoPage />} />
            </Route>
          </Routes>
        </main>

      </Router>
    </>
  )
}

export default App
