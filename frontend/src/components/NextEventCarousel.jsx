import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const NextEventCarousel = ({ selectedOrg }) => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Get the actual visible width of the container
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    // Initial calculation with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateWidth, 10)
    
    // Update on resize
    window.addEventListener('resize', updateWidth)
    
    // Update on orientation change for mobile devices (with delay for layout recalculation)
    const handleOrientationChange = () => {
      setTimeout(updateWidth, 150)
    }
    window.addEventListener('orientationchange', handleOrientationChange)
    
    // Use ResizeObserver for more accurate width tracking, especially on mobile
    let resizeObserver = null
    const setupObserver = () => {
      if (containerRef.current && window.ResizeObserver) {
        resizeObserver = new ResizeObserver(() => {
          updateWidth()
        })
        resizeObserver.observe(containerRef.current)
      }
    }
    
    // Setup observer after a short delay to ensure ref is set
    const observerTimeout = setTimeout(setupObserver, 50)
    
    return () => {
      clearTimeout(timeoutId)
      clearTimeout(observerTimeout)
      window.removeEventListener('resize', updateWidth)
      window.removeEventListener('orientationchange', handleOrientationChange)
      if (resizeObserver && containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  const events = [
    {
      id: 1,
      title: 'Networking Event 2024',
      description: 'Join us for an evening of networking and connections with fellow alumni.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop',
      date: 'March 15, 2024'
    },
    {
      id: 2,
      title: 'Annual Gala Dinner',
      description: 'Celebrate our achievements and reconnect with old friends at our annual gala.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=400&fit=crop',
      date: 'April 20, 2024'
    },
    {
      id: 3,
      title: 'Professional Development Workshop',
      description: 'Enhance your skills with our exclusive professional development session.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
      date: 'May 10, 2024'
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <section id="next-event-section" className="py-6 sm:py-12 pb-12 sm:pb-12 bg-gray-50" aria-labelledby="next-event-title">
      <div id="next-event-container" className="container mx-auto px-0 sm:px-4">
        <h2 id="next-event-title" className="text-2xl sm:text-3xl font-bold text-tec-blue mb-4 sm:mb-8 text-center px-3 sm:px-0">Next Events</h2>
        <div id="next-event-carousel-wrapper" className="relative w-full sm:max-w-4xl sm:mx-auto h-[500px] sm:h-[600px]">
          <div 
            id="next-event-carousel-container" 
            ref={containerRef}
            className="overflow-hidden rounded-none sm:rounded-lg shadow-xl h-full w-full"
            role="region"
            aria-label="Upcoming events carousel"
            aria-live="polite"
          >
            <div
              id="next-event-carousel-track"
              className="flex transition-transform duration-500 ease-in-out h-full w-full"
              style={{ 
                transform: containerWidth > 0
                  ? `translateX(-${currentIndex * containerWidth}px)`
                  : `translateX(-${currentIndex * 100}%)`
              }}
              role="list"
            >
              {events.map((event, index) => (
                <div 
                  key={event.id} 
                  id={`next-event-slide-${event.id}`} 
                  className="min-w-full w-full flex-shrink-0 h-full"
                  role="listitem"
                  aria-label={`Event ${index + 1} of ${events.length}: ${event.title}`}
                >
                  <div id={`next-event-card-${event.id}`} className="bg-white rounded-none sm:rounded-lg overflow-hidden h-full w-full">
                    <div id={`next-event-card-content-${event.id}`} className="flex flex-col md:flex-row h-full">
                      <div id={`next-event-image-wrapper-${event.id}`} className="w-full md:w-1/2 h-1/2 md:h-full">
                        <img
                          id={`next-event-image-${event.id}`}
                          src={event.image}
                          alt={`${event.title} - ${event.description}`}
                          className="w-full h-full object-cover"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                      <div id={`next-event-text-wrapper-${event.id}`} className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center h-1/2 md:h-full overflow-y-auto">
                        <p id={`next-event-date-${event.id}`} className="text-tec-blue font-semibold mb-2 text-sm sm:text-base">{event.date}</p>
                        <h3 id={`next-event-card-title-${event.id}`} className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">{event.title}</h3>
                        <p id={`next-event-description-${event.id}`} className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">{event.description}</p>
                        <button 
                          id={`next-event-learn-more-${event.id}`} 
                          onClick={() => navigate(`/${selectedOrg || 'Dallas'}/event/${event.id}`)}
                          aria-label={`Learn more about ${event.title}`}
                          className="bg-tec-blue text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-tec-blue-dark transition-colors text-sm sm:text-base w-full sm:w-fit focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            id="next-event-prev-button"
            onClick={prevSlide}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') prevSlide()
            }}
            className="absolute left-1 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
            aria-label="Previous event"
            aria-controls="next-event-carousel-track"
          >
            <svg id="next-event-prev-icon" className="w-5 h-5 sm:w-6 sm:h-6 text-tec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            id="next-event-next-button"
            onClick={nextSlide}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') nextSlide()
            }}
            className="absolute right-1 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
            aria-label="Next event"
            aria-controls="next-event-carousel-track"
          >
            <svg id="next-event-next-icon" className="w-5 h-5 sm:w-6 sm:h-6 text-tec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

              {/* Dots Indicator */}
              <div id="next-event-dots-container" className="hidden sm:flex justify-center mt-3 gap-2" role="tablist" aria-label="Event navigation">
                {events.map((_, index) => (
                  <button
                    key={index}
                    id={`next-event-dot-${index}`}
                    onClick={() => goToSlide(index)}
                    role="tab"
                    aria-selected={index === currentIndex}
                    aria-controls={`next-event-slide-${events[index].id}`}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2 ${
                      index === currentIndex ? 'bg-tec-blue' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to event ${index + 1}: ${events[index].title}`}
                  />
                ))}
              </div>
        </div>
      </div>
    </section>
  )
}

export default NextEventCarousel

