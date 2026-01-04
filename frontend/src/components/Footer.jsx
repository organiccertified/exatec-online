import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="footer-main" className="bg-tec-blue text-white py-4 sm:py-6" role="contentinfo">
      <div id="footer-container" className="container mx-auto px-3 sm:px-4">
        <div id="footer-content" className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
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
    </footer>
  )
}

export default Footer

