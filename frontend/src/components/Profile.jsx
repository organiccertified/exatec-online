import { useState } from 'react'

const Profile = ({ isSignedIn, setShowSignIn, selectedOrg, setSelectedOrg, isSubscribed, setIsSubscribed }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showUnsubscribeConfirm, setShowUnsubscribeConfirm] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: 'user@example.com',
    phone: '',
    campus: '',
    graduationYear: '',
    association: selectedOrg || 'Dallas'
  })
  const [emailError, setEmailError] = useState('')
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  const handleEmailChange = (e) => {
    const value = e.target.value
    setProfileData({ ...profileData, email: value })
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }
  
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '') // Remove non-digits
    if (value.length <= 12) {
      setProfileData({ ...profileData, phone: value })
    }
  }
  // If user is not signed in, show sign-in modal
  if (!isSignedIn) {
    if (setShowSignIn) {
      setShowSignIn(true)
    }
    return (
      <section id="profile-section" className="py-6 sm:py-12 bg-gray-50">
        <div id="profile-container" className="container mx-auto px-3 sm:px-4">
          <div id="profile-signin-required" className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-center">
            <h2 id="profile-signin-required-title" className="text-xl sm:text-2xl font-bold text-tec-blue mb-4">
              Sign In Required
            </h2>
            <p id="profile-signin-required-message" className="text-base sm:text-lg text-gray-700 mb-6">
              Please sign in to view your profile.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="profile-section" className="py-6 sm:py-12 bg-gray-50 pt-20 sm:pt-6">
      <div id="profile-container" className="container mx-auto px-3 sm:px-4">
        <h1 id="profile-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-tec-blue mb-4 sm:mb-8 text-center">
          My Profile
        </h1>
        <div id="profile-content" className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <div id="profile-info" className="space-y-4 sm:space-y-6">
            <div id="profile-welcome" className="text-center mb-6">
              <p id="profile-welcome-message" className="text-base sm:text-lg text-gray-700">
                Manage your profile information and preferences.
              </p>
            </div>
            
            <div id="profile-details" className="space-y-4">
              <div id="profile-email-field" className="border-b border-gray-200 pb-4">
                <label id="profile-email-label" htmlFor="profile-email-input" className="text-sm font-semibold text-tec-blue mb-2 block">
                  Email:
                </label>
                <input
                  id="profile-email-input"
                  type="email"
                  value={profileData.email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-base text-gray-700 ${
                    emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-tec-blue'
                  }`}
                />
                {emailError && (
                  <p id="profile-email-error" className="text-red-500 text-sm mt-1">
                    {emailError}
                  </p>
                )}
              </div>
              
              <div id="profile-phone-field" className="border-b border-gray-200 pb-4">
                <label id="profile-phone-label" htmlFor="profile-phone-input" className="text-sm font-semibold text-tec-blue mb-2 block">
                  Phone:
                </label>
                <input
                  id="profile-phone-input"
                  type="tel"
                  value={profileData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter your phone number"
                  maxLength={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue text-base text-gray-700"
                />
                <p id="profile-phone-hint" className="text-gray-500 text-xs mt-1">
                  Numbers only, up to 12 digits
                </p>
              </div>
              
              <div id="profile-firstname-field" className="border-b border-gray-200 pb-4">
                <label id="profile-firstname-label" htmlFor="profile-firstname-input" className="text-sm font-semibold text-tec-blue mb-2 block">
                  First Name:
                </label>
                <input
                  id="profile-firstname-input"
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue text-base text-gray-700"
                />
              </div>
              
              <div id="profile-lastname-field" className="border-b border-gray-200 pb-4">
                <label id="profile-lastname-label" htmlFor="profile-lastname-input" className="text-sm font-semibold text-tec-blue mb-2 block">
                  Last Name:
                </label>
                <input
                  id="profile-lastname-input"
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue text-base text-gray-700"
                />
              </div>
              
              <div id="profile-campus-field" className="border-b border-gray-200 pb-4">
                <label id="profile-campus-label" htmlFor="profile-campus-input" className="text-sm font-semibold text-tec-blue mb-2 block">
                  Campus:
                </label>
                <input
                  id="profile-campus-input"
                  type="text"
                  value={profileData.campus}
                  onChange={(e) => setProfileData({ ...profileData, campus: e.target.value })}
                  placeholder="Enter your campus"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue text-base text-gray-700"
                />
              </div>
              
              <div id="profile-graduation-year-field" className="border-b border-gray-200 pb-4">
                <label id="profile-graduation-year-label" htmlFor="profile-graduation-year-input" className="text-sm font-semibold text-tec-blue mb-2 block">
                  Graduation Year:
                </label>
                <input
                  id="profile-graduation-year-input"
                  type="number"
                  value={profileData.graduationYear}
                  onChange={(e) => setProfileData({ ...profileData, graduationYear: e.target.value })}
                  placeholder="Enter your graduation year"
                  min="1950"
                  max="2099"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue text-base text-gray-700"
                />
              </div>
              
              <div id="profile-association-field" className="border-b border-gray-200 pb-4">
                <label id="profile-association-label" htmlFor="profile-association-input" className="text-sm font-semibold text-tec-blue mb-2 block">
                  Association:
                </label>
                <select
                  id="profile-association-input"
                  value={profileData.association}
                  onChange={(e) => {
                    setProfileData({ ...profileData, association: e.target.value })
                    if (setSelectedOrg) {
                      setSelectedOrg(e.target.value)
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue text-base text-gray-700 bg-white"
                >
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div id="profile-actions" className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button
                id="profile-save-button"
                onClick={() => {
                  // Handle save logic here
                  console.log('Save profile')
                }}
                className="flex-1 bg-tec-blue text-white px-6 py-3 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium text-base focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
              >
                Save
              </button>
              {isSubscribed && (
                <button
                  id="profile-unsubscribe-button"
                  onClick={() => setShowUnsubscribeConfirm(true)}
                  className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
                >
                  Unsubscribe
                </button>
              )}
              <button
                id="profile-delete-account-button"
                onClick={() => setShowDeleteConfirm(true)}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Account Confirmation Popup */}
      {showDeleteConfirm && (
        <div
          id="profile-delete-confirm-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            id="profile-delete-confirm-content"
            className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-delete-confirm-title"
          >
            <h2 id="profile-delete-confirm-title" className="text-2xl font-bold text-gray-800 text-center mb-4">
              Are you sure you want to delete your account?
            </h2>
            <p id="profile-delete-confirm-message" className="text-gray-700 text-center mb-6">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <div id="profile-delete-confirm-buttons" className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                id="profile-delete-confirm-yes-button"
                onClick={() => {
                  // Handle account deletion here
                  console.log('Account deleted')
                  setShowDeleteConfirm(false)
                  // You might want to redirect or sign out the user here
                }}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
              >
                Yes
              </button>
              <button
                id="profile-delete-confirm-no-button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium text-base focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Unsubscribe Confirmation Popup */}
      {showUnsubscribeConfirm && (
        <div
          id="profile-unsubscribe-confirm-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowUnsubscribeConfirm(false)}
        >
          <div
            id="profile-unsubscribe-confirm-content"
            className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-unsubscribe-confirm-title"
          >
            <h2 id="profile-unsubscribe-confirm-title" className="text-2xl font-bold text-gray-800 text-center mb-4">
              Are you sure you want to unsubscribe from the distribution list?
            </h2>
            <div id="profile-unsubscribe-confirm-buttons" className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              <button
                id="profile-unsubscribe-confirm-yes-button"
                onClick={() => {
                  setIsSubscribed(false)
                  setShowUnsubscribeConfirm(false)
                }}
                className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
              >
                Yes
              </button>
              <button
                id="profile-unsubscribe-confirm-no-button"
                onClick={() => setShowUnsubscribeConfirm(false)}
                className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium text-base focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Profile

