import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Board from './components/Board'
import Register from './components/Register'
import Contact from './components/Contact'
import PrivacyPolicy from './components/PrivacyPolicy'
import Footer from './components/Footer'
import CookieNotice from './components/CookieNotice'

function App() {
  const [selectedOrg, setSelectedOrg] = useState('Dallas')
  const [showSignIn, setShowSignIn] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <Router>
      <div id="app-container" className="min-h-screen flex flex-col">
        <Header selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} showSignIn={showSignIn} setShowSignIn={setShowSignIn} isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        <Navigation selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} onSignInClick={() => setShowSignIn(true)} isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
        <main id="app-main" className="flex-grow">
          <Routes>
            <Route path="/" element={<Home selectedOrg={selectedOrg} />} />
            <Route path="/register" element={<Register selectedOrg={selectedOrg} />} />
            <Route path="/board" element={<Board />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
        <CookieNotice />
      </div>
    </Router>
  )
}

export default App

