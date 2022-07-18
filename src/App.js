import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Carrinho from './pages/Carrinho'
import Cozinha from './pages/Cozinha'
import Retirada from './pages/Retirada'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Carrinho />} />
            <Route path="/kitchen" element={<Cozinha />} />
            <Route path="/order" element={<Retirada />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
