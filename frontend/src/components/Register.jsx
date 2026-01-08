import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = ({ selectedOrg, isSignedIn, setShowSignIn, isSubscribed, setIsSubscribed }) => {
  const [showPopup, setShowPopup] = useState(false)

  const handleSubscribe = () => {
    if (isSignedIn) {
      // User is signed in, proceed with subscription
      setIsSubscribed(true)
      setShowPopup(true)
    } else {
      // User is not signed in, show sign-in modal
      setShowSignIn(true)
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <>
      <section id="register-section" className="py-6 sm:py-12 bg-gray-50">
        <div id="register-container" className="container mx-auto px-3 sm:px-4">
          <h1 id="register-title" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-tec-blue mb-4 sm:mb-8 text-center px-2">
            Subscribe to the distribution list of Exatec {selectedOrg}
          </h1>
          {isSubscribed ? (
            <div id="register-already-subscribed" className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
              <p id="register-already-subscribed-message" className="text-base sm:text-lg text-gray-700 mb-6">
                If you want to unsubscribe change this on your profile
              </p>
              <Link
                id="register-profile-button"
                to="/profile"
                className="inline-block bg-tec-blue text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
              >
                Profile
              </Link>
            </div>
          ) : (
            <div id="register-button-container" className="flex justify-center mt-4 sm:mt-8">
              <button
                id="register-accept-button"
                onClick={handleSubscribe}
                className="bg-tec-blue text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium text-base sm:text-lg w-full sm:w-auto max-w-xs focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>

      {showPopup && (
        <>
          <div
            id="register-popup-overlay"
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleClosePopup}
          >
            <div
              id="register-popup-content"
              className="bg-white rounded-lg shadow-xl p-4 sm:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="register-popup-title" className="text-xl sm:text-2xl font-bold text-tec-blue text-center mb-4">
                Subscription Successful!
              </h2>
              <p id="register-popup-message" className="text-gray-700 text-center mb-6">
                You have been successfully subscribed to the distribution list of Exatec {selectedOrg}.
              </p>
              <div id="register-popup-button-container" className="flex justify-center mt-6">
                <button
                  id="register-popup-close-button"
                  onClick={handleClosePopup}
                  className="bg-tec-blue text-white px-6 py-2 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Register

