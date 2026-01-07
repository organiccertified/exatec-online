import { useState } from 'react'

const Register = ({ selectedOrg, isSignedIn, setShowSignIn }) => {
  const [showPopup, setShowPopup] = useState(false)

  const handleAccept = () => {
    if (isSignedIn) {
      // User is signed in, proceed with registration
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
            Register to the distribution list of Exatec {selectedOrg}
          </h1>
          <div id="register-button-container" className="flex justify-center mt-4 sm:mt-8">
            <button
              id="register-accept-button"
              onClick={handleAccept}
              className="bg-tec-blue text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium text-base sm:text-lg w-full sm:w-auto max-w-xs focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
            >
              Accept
            </button>
          </div>
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
                Registration Successful!
              </h2>
              <p id="register-popup-message" className="text-gray-700 text-center mb-6">
                You have been successfully registered to the distribution list of Exatec {selectedOrg}.
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

