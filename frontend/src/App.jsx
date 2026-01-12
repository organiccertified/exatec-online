import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Board from './components/Board'
import Register from './components/Register'
import Contact from './components/Contact'
import About from './components/About'
import Profile from './components/Profile'
import PrivacyPolicy from './components/PrivacyPolicy'
import EventDetail from './components/EventDetail'
import Footer from './components/Footer'
import CookieNotice from './components/CookieNotice'
import whiteFave from './pictures/white_fave.png'

function App() {
  const [selectedOrg, setSelectedOrg] = useState('Dallas')
  const [showSignIn, setShowSignIn] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  return (
    <Router>
      <div 
        id="app-container" 
        className="min-h-screen flex flex-col relative"
        style={{
          backgroundImage: `url(${whiteFave})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
            <Header selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} showSignIn={showSignIn} setShowSignIn={setShowSignIn} isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} cities={cities} citiesLoading={citiesLoading} />
            <Navigation selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} onSignInClick={() => setShowSignIn(true)} isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} setShowSignIn={setShowSignIn} cities={cities} citiesLoading={citiesLoading} />
        <main id="app-main" className="flex-grow">
          <Routes>
            <Route path="/" element={<Home selectedOrg={selectedOrg} />} />
            <Route path="/subscribe" element={<Register selectedOrg={selectedOrg} isSignedIn={isSignedIn} setShowSignIn={setShowSignIn} isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} />} />
            <Route path="/board" element={<Board isSignedIn={isSignedIn} setShowSignIn={setShowSignIn} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About selectedOrg={selectedOrg} />} />
                <Route path="/profile" element={<Profile isSignedIn={isSignedIn} setShowSignIn={setShowSignIn} selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} cities={cities} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/:city/event/:eventId" element={<EventDetail selectedOrg={selectedOrg} />} />
          </Routes>
        </main>
        <Footer isSignedIn={isSignedIn} setShowSignIn={setShowSignIn} />
        <CookieNotice />
      </div>
    </Router>
  )
}

export default App

