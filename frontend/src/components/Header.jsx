import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ selectedOrg, setSelectedOrg, showSignIn, setShowSignIn, isSignedIn, setIsSignedIn }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close user menu if clicking outside
      if (isUserMenuOpen && !event.target.closest('#header-user-menu-container')) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isUserMenuOpen])

  // Close sign-in popup when clicking on any link
  useEffect(() => {
    const handleLinkClick = (event) => {
      if (!showSignIn) return
      
      // Don't close if clicking inside the sign-in popup content
      if (event.target.closest('#signin-popup-content')) {
        return
      }
      
      // Check if the clicked element is a link (a tag or React Router Link)
      const clickedElement = event.target
      const isLink = clickedElement.closest('a') || 
                     clickedElement.closest('[role="link"]') ||
                     (clickedElement.tagName === 'A')
      
      // Close popup if clicking on a link outside the popup
      if (isLink) {
        setShowSignIn(false)
      }
    }

    if (showSignIn) {
      // Use capture phase to catch events early, before they bubble
      document.addEventListener('click', handleLinkClick, true)
    }

    return () => {
      document.removeEventListener('click', handleLinkClick, true)
    }
  }, [showSignIn])
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  })
  const [signUpData, setSignUpData] = useState({
    association: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    campus: '',
    degree: '',
    graduationYear: ''
  })

  return (
    <header id="header-main" className="w-full bg-white shadow-md" role="banner">
      <div 
        id="header-container" 
        className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 hidden sm:flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 transition-transform duration-300"
      >
        <div id="header-dropdown-wrapper" className="relative w-full sm:w-auto">
          <button
            id="header-dropdown-button"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && isOpen) setIsOpen(false)
            }}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label="Select your Organization"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base text-tec-blue hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 w-full sm:w-auto justify-between sm:justify-start"
          >
            <span id="header-dropdown-label" className="font-medium truncate">Select your Organization</span>
            <svg
              id="header-dropdown-arrow"
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isOpen && (
            <>
              <div
                id="header-dropdown-overlay"
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              ></div>
              <div 
                id="header-dropdown-menu" 
                className="absolute left-0 mt-2 w-full sm:w-48 bg-white rounded-lg shadow-lg z-20 border border-gray-200 max-h-64 overflow-y-auto"
                role="listbox"
                aria-label="Organization options"
              >
                {citiesLoading ? (
                  <div className="px-4 py-2 text-center text-gray-500">
                    Loading...
                  </div>
                ) : cities.length === 0 ? (
                  <div className="px-4 py-2 text-center text-gray-500">
                    No cities available
                  </div>
                ) : (
                  cities.map((city) => (
                    <button
                      key={city.id}
                      id={`header-dropdown-option-${city.slug}`}
                      onClick={() => {
                        setSelectedOrg(city.name)
                        setIsOpen(false)
                      }}
                      role="option"
                      aria-selected={selectedOrg === city.name}
                      className={`w-full text-left px-4 py-2 hover:bg-tec-blue hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-inset ${
                        selectedOrg === city.name ? 'bg-tec-blue text-white' : 'text-gray-700'
                      }`}
                    >
                      {city.name}
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>
        {isSignedIn ? (
          <div id="header-user-menu-container" className="relative">
            <button
              id="header-user-icon-button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="p-2 text-tec-blue hover:text-tec-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 rounded-lg"
              aria-label="User menu"
              aria-expanded={isUserMenuOpen}
            >
              <svg
                id="header-user-icon-svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            
            {/* User Menu Dropdown */}
            {isUserMenuOpen && (
              <>
                <div
                  id="header-user-menu-overlay"
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div
                  id="header-user-menu-dropdown"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-tec-blue hover:text-white transition-colors first:rounded-t-lg"
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      setIsSignedIn(false)
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-tec-blue hover:text-white transition-colors last:rounded-b-lg"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            id="header-sign-in-button"
            onClick={() => setShowSignIn(true)}
            aria-label="Sign in to your account"
            className="bg-tec-blue text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 w-full sm:w-auto"
          >
            Sign in
          </button>
        )}
      </div>

      {showSignIn && (
        <>
          <div
            id="signin-popup-overlay"
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setShowSignIn(false)}
          ></div>
          <div
            id="signin-popup-container"
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div
              id="signin-popup-content"
              className="bg-white rounded-lg shadow-xl p-4 sm:p-8 max-w-md w-full mx-4 relative max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="signin-popup-title"
            >
              <h2 id="signin-popup-title" className="text-2xl font-bold text-tec-blue text-center mb-2">
                Sign in to Exatec.online
              </h2>
              <p id="signin-popup-signup-text" className="text-center text-gray-600 mb-6">
                Don't have an account? <span 
                  id="signin-popup-signup-link" 
                  className="text-tec-blue hover:underline cursor-pointer"
                  onClick={() => {
                    setShowSignIn(false)
                    setShowSignUp(true)
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setShowSignIn(false)
                      setShowSignUp(true)
                    }
                  }}
                >Sign up</span>
              </p>
              
              <form 
                id="signin-form" 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  // Handle sign-in logic here
                  // For now, just set signed in state
                  setIsSignedIn(true)
                  setShowSignIn(false)
                }}
              >
                <div id="signin-email-field">
                  <label htmlFor="signin-email-input" className="sr-only">Email Address</label>
                  <input
                    id="signin-email-input"
                    type="email"
                    placeholder="Email Address"
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    aria-label="Email Address"
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue"
                    required
                  />
                </div>
                <div id="signin-password-field">
                  <label htmlFor="signin-password-input" className="sr-only">Password</label>
                  <input
                    id="signin-password-input"
                    type="password"
                    placeholder="Password"
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    aria-label="Password"
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue"
                    required
                  />
                </div>
                <div id="signin-forgot-password-container" className="text-right mb-4">
                  <a
                    id="signin-forgot-password-link"
                    href="#"
                    className="text-tec-blue hover:underline text-sm"
                  >
                    Forgot Password
                  </a>
                </div>
                <button
                  id="signin-submit-button"
                  type="submit"
                  className="w-full bg-tec-blue text-white px-4 py-2 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium"
                >
                  Sign In
                </button>
              </form>

              <button
                id="signin-popup-close-button"
                onClick={() => setShowSignIn(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg id="signin-close-icon" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <>
          <div
            id="signup-popup-overlay"
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSignUp(false)}
          >
            <div
              id="signup-popup-content"
              className="bg-white rounded-lg shadow-xl p-4 sm:p-8 max-w-2xl w-full mx-4 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="signup-popup-title"
            >
              <h2 id="signup-popup-title" className="text-2xl font-bold text-tec-blue text-center mb-6">
                Sign Up
              </h2>
              
              <form 
                id="signup-form" 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  // Handle sign-up logic here
                  console.log('Sign up data:', signUpData)
                  // Close modal after submission
                  setShowSignUp(false)
                }}
              >
                {/* Association Dropdown */}
                <div id="signup-association-field">
                  <label htmlFor="signup-association-input" className="sr-only">Association you want to register to</label>
                  <select
                    id="signup-association-input"
                    value={signUpData.association}
                    onChange={(e) => setSignUpData({ ...signUpData, association: e.target.value })}
                    aria-label="Association you want to register to"
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue"
                    required
                  >
                    <option value="">Association you want to register to:</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* First Name */}
                <div id="signup-firstname-field">
                  <label htmlFor="signup-firstname-input" className="sr-only">First Name</label>
                  <input
                    id="signup-firstname-input"
                    type="text"
                    placeholder="First Name:"
                    value={signUpData.firstName}
                    onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
                    aria-label="First Name"
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue"
                    required
                  />
                </div>

                {/* Last Name */}
                <div id="signup-lastname-field">
                  <label htmlFor="signup-lastname-input" className="sr-only">Last Name</label>
                  <input
                    id="signup-lastname-input"
                    type="text"
                    placeholder="Last Name:"
                    value={signUpData.lastName}
                    onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })}
                    aria-label="Last Name"
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue"
                    required
                  />
                </div>

                {/* Email */}
                <div id="signup-email-field">
                  <label htmlFor="signup-email-input" className="sr-only">Email</label>
                  <input
                    id="signup-email-input"
                    type="email"
                    placeholder="Email:"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    aria-label="Email"
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue"
                    required
                  />
                </div>

                {/* Phone */}
                <div id="signup-phone-field">
                  <label htmlFor="signup-phone-input" className="sr-only">Phone</label>
                  <input
                    id="signup-phone-input"
                    type="tel"
                    placeholder="Phone:"
                    value={signUpData.phone}
                    onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                    aria-label="Phone"
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue"
                    required
                  />
                </div>

                {/* Campus */}
                <div id="signup-campus-field">
                  <label htmlFor="signup-campus-input" className="sr-only">Campus</label>
                  <input
                    id="signup-campus-input"
                    type="text"
                    placeholder="Campus:"
                    value={signUpData.campus}
                    onChange={(e) => setSignUpData({ ...signUpData, campus: e.target.value })}
                    aria-label="Campus"
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue"
                    required
                  />
                </div>

                {/* Degree */}
                <div id="signup-degree-field">
                  <label htmlFor="signup-degree-input" className="sr-only">Degree</label>
                  <input
                    id="signup-degree-input"
                    type="text"
                    placeholder="Degree:"
                    value={signUpData.degree}
                    onChange={(e) => setSignUpData({ ...signUpData, degree: e.target.value })}
                    aria-label="Degree"
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue"
                    required
                  />
                </div>

                {/* Graduation Year */}
                <div id="signup-graduation-year-field">
                  <label htmlFor="signup-graduation-year-input" className="sr-only">Graduation Year</label>
                  <input
                    id="signup-graduation-year-input"
                    type="number"
                    min="1950"
                    max="2099"
                    placeholder="Graduation Year:"
                    value={signUpData.graduationYear}
                    onChange={(e) => setSignUpData({ ...signUpData, graduationYear: e.target.value })}
                    aria-label="Graduation Year"
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue"
                    required
                  />
                </div>

                {/* Data Collection Note */}
                <div id="signup-privacy-note" className="text-sm text-gray-600 italic mb-4">
                  Note: We collect and store personal information submitted through this form.
                </div>

                {/* Subscribe Button */}
                <button
                  id="signup-register-button"
                  type="submit"
                  className="w-full bg-tec-blue text-white px-4 py-2 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium"
                >
                  Subscribe
                </button>
              </form>

              <button
                id="signup-popup-close-button"
                onClick={() => setShowSignUp(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg id="signup-close-icon" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default Header

