import { useState, useEffect } from 'react'

const CookieNotice = () => {
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Show notice after a short delay
      const timer = setTimeout(() => {
        setShowNotice(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowNotice(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShowNotice(false)
  }

  if (!showNotice) return null

  return (
    <div
      id="cookie-notice"
      className="fixed bottom-0 left-0 right-0 bg-tec-blue text-white z-50 shadow-lg"
      role="dialog"
      aria-labelledby="cookie-notice-title"
      aria-modal="true"
    >
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 id="cookie-notice-title" className="font-bold text-base sm:text-lg mb-2">
              Cookie Notice
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              We use cookies and similar technologies to provide personalized advertisements through Google AdSense, analyze site usage with Google Analytics, and improve your experience. By clicking "Accept," you consent to our use of cookies. You can manage your preferences in your browser settings.
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              id="cookie-notice-decline-button"
              onClick={handleDecline}
              className="px-4 py-2 text-sm sm:text-base border-2 border-white rounded-lg hover:bg-white hover:text-tec-blue transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-tec-blue flex-1 sm:flex-none"
              aria-label="Decline cookies"
            >
              Decline
            </button>
            <button
              id="cookie-notice-accept-button"
              onClick={handleAccept}
              className="px-4 py-2 text-sm sm:text-base bg-white text-tec-blue rounded-lg hover:bg-gray-100 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-tec-blue flex-1 sm:flex-none"
              aria-label="Accept cookies"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieNotice

