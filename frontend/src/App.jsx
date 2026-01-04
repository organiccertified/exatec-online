import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Board from './components/Board'
import Register from './components/Register'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [selectedOrg, setSelectedOrg] = useState('Dallas')

  return (
    <Router>
      <div id="app-container" className="min-h-screen flex flex-col">
        <Header selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} />
        <Navigation selectedOrg={selectedOrg} />
        <main id="app-main" className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register selectedOrg={selectedOrg} />} />
            <Route path="/board" element={<Board />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

