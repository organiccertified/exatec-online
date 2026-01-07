import { useState } from 'react'
import NextEventCarousel from './NextEventCarousel'
import PastEventsCarousel from './PastEventsCarousel'

const Home = ({ selectedOrg, isSignedIn, setShowSignIn }) => {
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false)
  return (
    <>
      {/* Welcome Description */}
      <section id="welcome-section" className="bg-white py-6 sm:py-8 md:py-10">
        <div id="welcome-container" className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div id="welcome-content" className="max-w-3xl mx-auto text-center">
            <p id="welcome-text" className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Welcome! We are the Tec de Monterrey Alumni Association based in{' '}
              <span id="welcome-city" className="font-semibold text-tec-blue">{selectedOrg}</span>.
              {' '}Here, you can contact us, discover upcoming events, and register to participate.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Event */}
      <section id="featured-event-section" className="bg-white py-6 sm:py-8 md:py-12" aria-labelledby="featured-event-title">
        <div id="featured-event-container" className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="featured-event-title" className="text-2xl sm:text-3xl font-bold text-tec-blue mb-6 sm:mb-8 text-center">
            Featured Event
          </h2>
          <div id="featured-event-card" className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div id="featured-event-content" className="flex flex-col lg:flex-row">
              {/* Image */}
              <div id="featured-event-image-container" className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto">
                <img
                  id="featured-event-image"
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop"
                  alt="Featured Event"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div id="featured-event-details" className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                <div id="featured-event-date" className="text-sm sm:text-base text-gray-500 mb-2 font-medium">
                  Date of event: <span id="featured-event-date-value" className="text-tec-blue">March 15, 2024</span>
                </div>
                <h3 id="featured-event-title-text" className="text-xl sm:text-2xl md:text-3xl font-bold text-tec-blue mb-3 sm:mb-4">
                  Networking Event 2024
                </h3>
                <p id="featured-event-description" className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  Join us for an evening of networking and connections with fellow alumni. This is a special opportunity to reconnect with old friends, meet new members, and strengthen our Exatec community bonds.
                </p>
                <div id="featured-event-button-container" className="mt-auto">
                  <button
                    id="featured-event-register-button"
                    onClick={() => {
                      if (isSignedIn) {
                        // User is signed in, proceed with registration
                        setShowRegistrationSuccess(true)
                        setTimeout(() => setShowRegistrationSuccess(false), 3000)
                      } else {
                        // User is not signed in, show sign-in modal
                        setShowSignIn(true)
                      }
                    }}
                    className="inline-block bg-tec-blue text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium text-base sm:text-lg text-center w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
                    aria-label="Register for this event"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Registration Success Message */}
      {showRegistrationSuccess && (
        <div
          id="registration-success-popup"
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowRegistrationSuccess(false)}
        >
          <div
            id="registration-success-content"
            className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-success-title"
          >
            <h2 id="registration-success-title" className="text-2xl font-bold text-tec-blue text-center mb-4">
              Registration Successful!
            </h2>
            <p id="registration-success-message" className="text-gray-700 text-center mb-6">
              You have been successfully registered for this event.
            </p>
            <button
              id="registration-success-close-button"
              onClick={() => setShowRegistrationSuccess(false)}
              className="w-full bg-tec-blue text-white px-4 py-2 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <NextEventCarousel isSignedIn={isSignedIn} setShowSignIn={setShowSignIn} />
      <PastEventsCarousel />
    </>
  )
}

export default Home

