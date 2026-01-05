import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()

  return (
    <footer id="footer-main" className="bg-tec-blue text-white py-4 sm:py-6" role="contentinfo">
      <div id="footer-container" className="container mx-auto px-3 sm:px-4">
        <div id="footer-content" className="flex flex-col gap-4 sm:gap-6">
          {/* Navigation Links */}
          <nav id="footer-navigation" className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6" aria-label="Footer navigation">
            <Link
              id="footer-home-link"
              to="/"
              className={`text-sm sm:text-base hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-tec-blue rounded px-2 py-1 transition-all ${
                location.pathname === '/' ? 'font-semibold underline' : ''
              }`}
              aria-label="Home"
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              Home
            </Link>
            <Link
              id="footer-register-link"
              to="/register"
              className={`text-sm sm:text-base hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-tec-blue rounded px-2 py-1 transition-all ${
                location.pathname === '/register' ? 'font-semibold underline' : ''
              }`}
              aria-label="Register"
              aria-current={location.pathname === '/register' ? 'page' : undefined}
            >
              Register
            </Link>
            <Link
              id="footer-board-link"
              to="/board"
              className={`text-sm sm:text-base hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-tec-blue rounded px-2 py-1 transition-all ${
                location.pathname === '/board' ? 'font-semibold underline' : ''
              }`}
              aria-label="Board"
              aria-current={location.pathname === '/board' ? 'page' : undefined}
            >
              Board
            </Link>
            <Link
              id="footer-contact-link"
              to="/contact"
              className={`text-sm sm:text-base hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-tec-blue rounded px-2 py-1 transition-all ${
                location.pathname === '/contact' ? 'font-semibold underline' : ''
              }`}
              aria-label="Contact"
              aria-current={location.pathname === '/contact' ? 'page' : undefined}
            >
              Contact
            </Link>
            <Link
              id="footer-privacy-policy-link"
              to="/privacy-policy"
              className={`text-sm sm:text-base hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-tec-blue rounded px-2 py-1 transition-all ${
                location.pathname === '/privacy-policy' ? 'font-semibold underline' : ''
              }`}
              aria-label="Privacy Policy"
              aria-current={location.pathname === '/privacy-policy' ? 'page' : undefined}
            >
              Privacy Policy
            </Link>
          </nav>
          
          {/* Bottom Section */}
          <div id="footer-bottom" className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-2 border-t border-tec-blue-light">
            <div id="footer-version" className="text-xs sm:text-sm text-center sm:text-left">
              Version 1.0.0
            </div>
            <div id="footer-links" className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <Link
                id="footer-add-association-link"
                to="/contact"
                className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-tec-blue rounded px-2 py-1 transition-all"
                aria-label="Add your Exatec Association - Contact us"
              >
                Add your Exatec Association
              </Link>
              <div id="footer-credit" className="text-sm">
                Created by Integra Sites
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

