import { useState } from 'react'

const Header = ({ selectedOrg, setSelectedOrg, showSignIn, setShowSignIn, isSignedIn, setIsSignedIn }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
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
                className="absolute left-0 mt-2 w-full sm:w-48 bg-white rounded-lg shadow-lg z-20 border border-gray-200"
                role="listbox"
                aria-label="Organization options"
              >
                <button
                  id="header-dropdown-option-dallas"
                  onClick={() => {
                    setSelectedOrg('Dallas')
                    setIsOpen(false)
                  }}
                  role="option"
                  aria-selected={selectedOrg === 'Dallas'}
                  className={`w-full text-left px-4 py-2 hover:bg-tec-blue hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-inset ${
                    selectedOrg === 'Dallas' ? 'bg-tec-blue text-white' : 'text-gray-700'
                  }`}
                >
                  Dallas
                </button>
                <button
                  id="header-dropdown-option-chicago"
                  onClick={() => {
                    setSelectedOrg('Chicago')
                    setIsOpen(false)
                  }}
                  role="option"
                  aria-selected={selectedOrg === 'Chicago'}
                  className={`w-full text-left px-4 py-2 hover:bg-tec-blue hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-inset ${
                    selectedOrg === 'Chicago' ? 'bg-tec-blue text-white' : 'text-gray-700'
                  }`}
                >
                  Chicago
                </button>
                <button
                  id="header-dropdown-option-san-antonio"
                  onClick={() => {
                    setSelectedOrg('San Antonio')
                    setIsOpen(false)
                  }}
                  role="option"
                  aria-selected={selectedOrg === 'San Antonio'}
                  className={`w-full text-left px-4 py-2 hover:bg-tec-blue hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-inset ${
                    selectedOrg === 'San Antonio' ? 'bg-tec-blue text-white' : 'text-gray-700'
                  }`}
                >
                  San Antonio
                </button>
                <button
                  id="header-dropdown-option-houston"
                  onClick={() => {
                    setSelectedOrg('Houston')
                    setIsOpen(false)
                  }}
                  role="option"
                  aria-selected={selectedOrg === 'Houston'}
                  className={`w-full text-left px-4 py-2 hover:bg-tec-blue hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-inset ${
                    selectedOrg === 'Houston' ? 'bg-tec-blue text-white' : 'text-gray-700'
                  }`}
                >
                  Houston
                </button>
              </div>
            </>
          )}
        </div>
        <button
          id="header-sign-in-button"
          onClick={() => setShowSignIn(true)}
          aria-label="Sign in to your account"
          className="bg-tec-blue text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 w-full sm:w-auto"
        >
          Sign in
        </button>
      </div>

      {showSignIn && (
        <>
          <div
            id="signin-popup-overlay"
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={() => setShowSignIn(false)}
          >
            <div
              id="signin-popup-content"
              className="bg-white rounded-lg shadow-xl p-4 sm:p-8 max-w-md w-full mx-4 relative max-h-[90vh] overflow-y-auto"
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
                    <option value="Dallas">Dallas</option>
                    <option value="New York">New York</option>
                    <option value="Chicago">Chicago</option>
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

                {/* Register Button */}
                <button
                  id="signup-register-button"
                  type="submit"
                  className="w-full bg-tec-blue text-white px-4 py-2 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium"
                >
                  Register
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

