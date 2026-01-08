import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const EventDetail = ({ selectedOrg }) => {
  const { city, eventId } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // TODO: Replace with actual API call to fetch event from database
    // For now, using placeholder data
    const fetchEvent = async () => {
      try {
        setLoading(true)
        // Simulate API call
        // const response = await fetch(`/api/cities/${city}/events/${eventId}`)
        // const data = await response.json()
        // setEvent(data)
        
        // Placeholder data - will be replaced with actual API call
        setTimeout(() => {
          setEvent({
            id: eventId,
            title: 'Networking Event 2024',
            description: 'Join us for an evening of networking and connections with fellow alumni. This is a special opportunity to reconnect with old friends, meet new members, and strengthen our Exatec community bonds.',
            date: 'March 15, 2024',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
            location: 'Dallas, TX',
            city: city || selectedOrg
          })
          setLoading(false)
        }, 500)
      } catch (err) {
        setError('Failed to load event details')
        setLoading(false)
      }
    }

    fetchEvent()
  }, [city, eventId, selectedOrg])

  if (loading) {
    return (
      <section id="event-detail-section" className="py-6 sm:py-12 bg-gray-50 pt-20 sm:pt-6">
        <div id="event-detail-container" className="container mx-auto px-3 sm:px-4">
          <div id="event-detail-loading" className="max-w-4xl mx-auto text-center">
            <p id="event-detail-loading-text" className="text-lg text-gray-700">Loading event details...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !event) {
    return (
      <section id="event-detail-section" className="py-6 sm:py-12 bg-gray-50 pt-20 sm:pt-6">
        <div id="event-detail-container" className="container mx-auto px-3 sm:px-4">
          <div id="event-detail-error" className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
            <h2 id="event-detail-error-title" className="text-2xl font-bold text-tec-blue mb-4">
              Event Not Found
            </h2>
            <p id="event-detail-error-message" className="text-gray-700 mb-6">
              {error || 'The event you are looking for does not exist.'}
            </p>
            <button
              id="event-detail-back-button"
              onClick={() => navigate('/')}
              className="bg-tec-blue text-white px-6 py-2 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="event-detail-section" className="py-6 sm:py-12 bg-gray-50 pt-20 sm:pt-6">
      <div id="event-detail-container" className="container mx-auto px-3 sm:px-4">
        <button
          id="event-detail-back-link"
          onClick={() => navigate('/')}
          className="mb-4 sm:mb-6 text-tec-blue hover:text-tec-blue-dark transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 rounded px-2 py-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Events
        </button>
        
        <div id="event-detail-card" className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div id="event-detail-image-container" className="w-full h-64 sm:h-80 lg:h-96">
            <img
              id="event-detail-image"
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div id="event-detail-content" className="p-6 sm:p-8 md:p-10">
            <div id="event-detail-date" className="text-sm sm:text-base text-gray-500 mb-2 font-medium">
              Date: <span id="event-detail-date-value" className="text-tec-blue">{event.date}</span>
            </div>
            {event.location && (
              <div id="event-detail-location" className="text-sm sm:text-base text-gray-500 mb-4 font-medium">
                Location: <span id="event-detail-location-value" className="text-tec-blue">{event.location}</span>
              </div>
            )}
            <h1 id="event-detail-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-tec-blue mb-4 sm:mb-6">
              {event.title}
            </h1>
            <div id="event-detail-description" className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {event.description}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventDetail

