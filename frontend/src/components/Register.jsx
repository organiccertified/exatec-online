import { useState } from 'react'

const Register = ({ selectedOrg }) => {
  const [showPopup, setShowPopup] = useState(false)

  const handleAccept = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <>
      <section id="register-section" className="py-12 bg-gray-50">
        <div id="register-container" className="container mx-auto px-4">
          <h1 id="register-title" className="text-4xl font-bold text-tec-blue mb-8 text-center">
            Register to the distribution list of Exatec {selectedOrg}
          </h1>
          <div id="register-button-container" className="flex justify-center mt-8">
            <button
              id="register-accept-button"
              onClick={handleAccept}
              className="bg-tec-blue text-white px-8 py-3 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium text-lg"
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
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={handleClosePopup}
          >
            <div
              id="register-popup-content"
              className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="register-popup-title" className="text-2xl font-bold text-tec-blue text-center mb-4">
                Registered
              </h2>
              <div id="register-popup-button-container" className="flex justify-center mt-6">
                <button
                  id="register-popup-close-button"
                  onClick={handleClosePopup}
                  className="bg-tec-blue text-white px-6 py-2 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium"
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

