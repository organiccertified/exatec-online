import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import exatecLogo from '../pictures/exatec-blue-med.png'

const Navigation = ({ selectedOrg, setSelectedOrg, onSignInClick, isSignedIn, onSignOut, setShowSignIn }) => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Close menu when scrolling
      setIsMenuOpen(false)
      setIsUserMenuOpen(false)
    }

    const handleClickOutside = (event) => {
      // Close user menu if clicking outside
      if (isUserMenuOpen && !event.target.closest('#navigation-user-menu-container')) {
        setIsUserMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isUserMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Sticky Header - Mobile Only */}
      <div 
        id="navigation-sticky-header" 
        className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 sm:hidden"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between h-16">
          {/* Hamburger Menu - Left */}
          <button
            id="navigation-hamburger-button"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="p-2 text-tec-blue focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 rounded-lg"
          >
            <svg
              id="navigation-hamburger-icon"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo - Center */}
          <div id="navigation-sticky-logo" className="flex-1 flex justify-center">
            <img 
              src={exatecLogo} 
              alt="EXATEC" 
              className="h-8 w-auto"
            />
          </div>

          {/* Sign In / User Menu - Right */}
          {isSignedIn ? (
            <div id="navigation-user-menu-container" className="relative">
              <button
                id="navigation-sticky-user-icon"
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen)
                  closeMenu() // Close hamburger menu if open
                }}
                className="p-2 text-tec-blue hover:text-tec-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 rounded-lg"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <svg
                  id="navigation-user-icon-svg"
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
                <div
                  id="navigation-user-menu-dropdown"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <Link
                    to="/profile"
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      closeMenu()
                    }}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-tec-blue hover:text-white transition-colors first:rounded-t-lg"
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      onSignOut()
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-tec-blue hover:text-white transition-colors last:rounded-b-lg"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              id="navigation-sticky-signin-button"
              onClick={() => {
                onSignInClick()
                closeMenu()
              }}
              className="text-sm font-semibold text-tec-blue hover:text-tec-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Sign in"
            >
              Sign in
            </button>
          )}
        </div>

        {/* Hamburger Menu Dropdown */}
        {isMenuOpen && (
          <>
            <div
              id="navigation-menu-overlay"
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              style={{ top: '64px' }}
              onClick={closeMenu}
            />
            <div
              id="navigation-menu-dropdown"
              className="absolute left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200"
              style={{ top: '64px' }}
            >
              <nav className="flex flex-col">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className={`px-6 py-4 text-base font-semibold border-b border-gray-100 transition-colors ${
                    location.pathname === '/' 
                      ? 'bg-tec-blue text-white' 
                      : 'text-tec-blue hover:bg-gray-50'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className={`px-6 py-4 text-base font-semibold border-b border-gray-100 transition-colors ${
                    location.pathname === '/register' 
                      ? 'bg-tec-blue text-white' 
                      : 'text-tec-blue hover:bg-gray-50'
                  }`}
                >
                  Register
                </Link>
                <Link
                  to="/board"
                  onClick={(e) => {
                    if (!isSignedIn) {
                      e.preventDefault()
                      closeMenu()
                      if (setShowSignIn) {
                        setShowSignIn(true)
                      }
                    } else {
                      closeMenu()
                    }
                  }}
                  className={`px-6 py-4 text-base font-semibold border-b border-gray-100 transition-colors ${
                    location.pathname === '/board' 
                      ? 'bg-tec-blue text-white' 
                      : 'text-tec-blue hover:bg-gray-50'
                  }`}
                >
                  Board
                </Link>
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className={`px-6 py-4 text-base font-semibold border-b border-gray-100 transition-colors ${
                    location.pathname === '/contact' 
                      ? 'bg-tec-blue text-white' 
                      : 'text-tec-blue hover:bg-gray-50'
                  }`}
                >
                  Contact
                </Link>
                <Link
                  to="/about"
                  onClick={closeMenu}
                  className={`px-6 py-4 text-base font-semibold border-b border-gray-100 transition-colors ${
                    location.pathname === '/about' 
                      ? 'bg-tec-blue text-white' 
                      : 'text-tec-blue hover:bg-gray-50'
                  }`}
                >
                  About Us
                </Link>
                {isSignedIn ? (
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className={`px-6 py-4 text-base font-semibold border-b border-gray-100 transition-colors ${
                      location.pathname === '/profile' 
                        ? 'bg-tec-blue text-white' 
                        : 'text-tec-blue hover:bg-gray-50'
                    }`}
                  >
                    Profile
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      closeMenu()
                      if (onSignInClick) {
                        onSignInClick()
                      }
                    }}
                    className="px-6 py-4 text-base font-semibold text-tec-blue hover:bg-gray-50 transition-colors text-left border-t border-gray-200"
                  >
                    Sign in
                  </button>
                )}
              </nav>
            </div>
          </>
        )}
      </div>

      {/* Regular Navigation */}
      {location.pathname !== '/contact' && location.pathname !== '/profile' && (
        <nav id="navigation-main" className="w-full border-b border-gray-200" role="navigation" aria-label="Main navigation">
        <div id="navigation-container" className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div id="navigation-header" className="text-center mb-4 sm:mb-6">
          <img 
            id="navigation-logo"
            src={exatecLogo} 
            alt="EXATEC - Tec de Monterrey Alumni Association" 
            className="mx-auto w-32 sm:w-48 md:w-56 max-w-full h-auto"
            width="200"
            height="auto"
          />
        </div>
        <div id="navigation-organization-wrapper" className="relative flex justify-center mb-4 sm:mb-6 mt-8 sm:mt-0">
          <button
            id="navigation-organization-header"
            onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && isOrgDropdownOpen) setIsOrgDropdownOpen(false)
            }}
            aria-expanded={isOrgDropdownOpen}
            aria-haspopup="listbox"
            aria-label="Select Organization"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-tec-blue text-center hover:text-tec-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 rounded-lg px-2 py-1 flex items-center gap-2"
          >
            <span>{selectedOrg}</span>
            <svg
              id="navigation-organization-arrow"
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${isOrgDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isOrgDropdownOpen && (
            <>
              <div
                id="navigation-organization-overlay"
                className="fixed inset-0 z-10"
                onClick={() => setIsOrgDropdownOpen(false)}
              ></div>
              <div 
                id="navigation-organization-dropdown" 
                className="absolute top-full mt-2 bg-white rounded-lg shadow-lg z-20 border border-gray-200 min-w-[150px]"
                role="listbox"
                aria-label="Organization options"
              >
                <button
                  id="navigation-organization-option-dallas"
                  onClick={() => {
                    setSelectedOrg('Dallas')
                    setIsOrgDropdownOpen(false)
                  }}
                  role="option"
                  aria-selected={selectedOrg === 'Dallas'}
                  className={`w-full text-left px-4 py-3 text-base sm:text-lg hover:bg-tec-blue hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-inset ${
                    selectedOrg === 'Dallas' ? 'bg-tec-blue text-white' : 'text-gray-700'
                  }`}
                >
                  Dallas
                </button>
                <button
                  id="navigation-organization-option-new-york"
                  onClick={() => {
                    setSelectedOrg('New York')
                    setIsOrgDropdownOpen(false)
                  }}
                  role="option"
                  aria-selected={selectedOrg === 'New York'}
                  className={`w-full text-left px-4 py-3 text-base sm:text-lg hover:bg-tec-blue hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-inset ${
                    selectedOrg === 'New York' ? 'bg-tec-blue text-white' : 'text-gray-700'
                  }`}
                >
                  New York
                </button>
                <button
                  id="navigation-organization-option-chicago"
                  onClick={() => {
                    setSelectedOrg('Chicago')
                    setIsOrgDropdownOpen(false)
                  }}
                  role="option"
                  aria-selected={selectedOrg === 'Chicago'}
                  className={`w-full text-left px-4 py-3 text-base sm:text-lg hover:bg-tec-blue hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-inset ${
                    selectedOrg === 'Chicago' ? 'bg-tec-blue text-white' : 'text-gray-700'
                  }`}
                >
                  Chicago
                </button>
              </div>
            </>
          )}
        </div>
        
        {/* Social Media Icons */}
        <div id="navigation-social-icons-header" className="flex justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <a
            id="navigation-header-facebook-icon"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tec-blue hover:text-tec-blue-dark transition-colors w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
            aria-label="Facebook"
          >
            <svg
              id="navigation-header-facebook-svg"
              className="w-6 h-6 sm:w-8 sm:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            id="navigation-header-instagram-icon"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tec-blue hover:text-tec-blue-dark transition-colors w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
            aria-label="Instagram"
          >
            <svg
              id="navigation-header-instagram-svg"
              className="w-6 h-6 sm:w-8 sm:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            id="navigation-header-whatsapp-icon"
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tec-blue hover:text-tec-blue-dark transition-colors w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
            aria-label="WhatsApp"
          >
            <svg
              id="navigation-header-whatsapp-svg"
              className="w-6 h-6 sm:w-8 sm:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
        <div 
          id="navigation-buttons" 
          className="hidden sm:flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-3 md:gap-4 justify-center items-stretch sm:items-center w-full transition-opacity duration-300"
        >
          <Link
            id="navigation-home-button"
            to="/"
            aria-current={location.pathname === '/' ? 'page' : undefined}
            className={`flex-1 sm:flex-none px-6 sm:px-5 md:px-6 py-4 sm:py-2 text-base sm:text-base rounded-lg transition-all font-semibold text-center focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 min-h-[56px] sm:min-h-[44px] flex items-center justify-center active:scale-95 touch-manipulation ${
              location.pathname === '/' 
                ? 'bg-tec-blue text-white hover:bg-tec-blue-dark shadow-md' 
                : 'bg-white text-tec-blue border-2 border-tec-blue hover:bg-tec-blue hover:text-white shadow-sm active:shadow-md'
            }`}
          >
            Home
          </Link>
          <Link
            id="navigation-register-button"
            to="/register"
            aria-current={location.pathname === '/register' ? 'page' : undefined}
            className={`flex-1 sm:flex-none px-6 sm:px-5 md:px-6 py-4 sm:py-2 text-base sm:text-base rounded-lg transition-all font-semibold text-center focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 min-h-[56px] sm:min-h-[44px] flex items-center justify-center active:scale-95 touch-manipulation ${
              location.pathname === '/register' 
                ? 'bg-tec-blue text-white hover:bg-tec-blue-dark shadow-md' 
                : 'bg-white text-tec-blue border-2 border-tec-blue hover:bg-tec-blue hover:text-white shadow-sm active:shadow-md'
            }`}
          >
            Register
          </Link>
          <Link
            id="navigation-board-button"
            to="/board"
            onClick={(e) => {
              if (!isSignedIn) {
                e.preventDefault()
                if (setShowSignIn) {
                  setShowSignIn(true)
                }
              }
            }}
            aria-current={location.pathname === '/board' ? 'page' : undefined}
            className={`flex-1 sm:flex-none px-6 sm:px-5 md:px-6 py-4 sm:py-2 text-base sm:text-base rounded-lg transition-all font-semibold text-center focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 min-h-[56px] sm:min-h-[44px] flex items-center justify-center active:scale-95 touch-manipulation ${
              location.pathname === '/board' 
                ? 'bg-tec-blue text-white hover:bg-tec-blue-dark shadow-md' 
                : 'bg-white text-tec-blue border-2 border-tec-blue hover:bg-tec-blue hover:text-white shadow-sm active:shadow-md'
            }`}
          >
            Board
          </Link>
          <Link
            id="navigation-contact-button"
            to="/contact"
            aria-current={location.pathname === '/contact' ? 'page' : undefined}
            className={`flex-1 sm:flex-none px-6 sm:px-5 md:px-6 py-4 sm:py-2 text-base sm:text-base rounded-lg transition-all font-semibold text-center focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 min-h-[56px] sm:min-h-[44px] flex items-center justify-center active:scale-95 touch-manipulation ${
              location.pathname === '/contact' 
                ? 'bg-tec-blue text-white hover:bg-tec-blue-dark shadow-md' 
                : 'bg-white text-tec-blue border-2 border-tec-blue hover:bg-tec-blue hover:text-white shadow-sm active:shadow-md'
            }`}
          >
            Contact
          </Link>
          <Link
            id="navigation-about-button"
            to="/about"
            aria-current={location.pathname === '/about' ? 'page' : undefined}
            className={`flex-1 sm:flex-none px-6 sm:px-5 md:px-6 py-4 sm:py-2 text-base sm:text-base rounded-lg transition-all font-semibold text-center focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 min-h-[56px] sm:min-h-[44px] flex items-center justify-center active:scale-95 touch-manipulation ${
              location.pathname === '/about' 
                ? 'bg-tec-blue text-white hover:bg-tec-blue-dark shadow-md' 
                : 'bg-white text-tec-blue border-2 border-tec-blue hover:bg-tec-blue hover:text-white shadow-sm active:shadow-md'
            }`}
          >
            About Us
          </Link>
          <div id="navigation-social-icons" className="flex gap-3 sm:gap-3 items-center justify-center w-full sm:w-auto sm:ml-4 mt-2 sm:mt-0">
            <a
              id="navigation-facebook-icon"
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tec-blue hover:text-tec-blue-dark transition-colors"
              aria-label="Facebook"
            >
              <svg
                id="navigation-facebook-svg"
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              id="navigation-instagram-icon"
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tec-blue hover:text-tec-blue-dark transition-colors"
              aria-label="Instagram"
            >
              <svg
                id="navigation-instagram-svg"
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              id="navigation-whatsapp-icon"
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tec-blue hover:text-tec-blue-dark transition-colors"
              aria-label="WhatsApp"
            >
              <svg
                id="navigation-whatsapp-svg"
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
      )}
    </>
  )
}

export default Navigation

