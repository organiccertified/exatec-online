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

              <div id="signin-divider-container" className="flex items-center my-6">
                <div id="signin-divider-line" className="flex-1 border-t border-gray-300"></div>
                <span id="signin-divider-text" className="px-4 text-gray-500 text-sm">or</span>
                <div id="signin-divider-line-2" className="flex-1 border-t border-gray-300"></div>
              </div>

              <div id="signin-social-buttons" className="space-y-3">
                <button
                  id="signin-google-button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <svg id="signin-google-icon" className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span id="signin-google-text">Continue with Google</span>
                </button>
                <button
                  id="signin-facebook-button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <svg id="signin-facebook-icon" className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span id="signin-facebook-text">Continue with Facebook</span>
                </button>
              </div>

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

