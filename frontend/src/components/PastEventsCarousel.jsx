import { useState, useEffect } from 'react'

const PastEventsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const pastEvents = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop',
      title: 'Networking Event 2023'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop',
      title: 'Annual Gala 2023'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
      title: 'Workshop Series 2023'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
      title: 'Community Service Day'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop',
      title: 'Alumni Reunion 2023'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
      title: 'Sports Tournament'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pastEvents.length)
    }, 3000) // Auto-advance every 3 seconds

    return () => clearInterval(interval)
  }, [pastEvents.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pastEvents.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + pastEvents.length) % pastEvents.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <section id="past-events-section" className="pt-12 sm:pt-12 py-6 sm:py-12 bg-white">
      <div id="past-events-container" className="container mx-auto px-3 sm:px-4">
        <h2 id="past-events-title" className="text-2xl sm:text-3xl font-bold text-tec-blue mb-4 sm:mb-8 text-center">Past Events</h2>
        <div id="past-events-carousel-wrapper" className="relative max-w-6xl mx-auto">
          <div id="past-events-carousel-container" className="overflow-hidden rounded-lg">
            <div
              id="past-events-carousel-track"
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {pastEvents.map((event) => (
                <div key={event.id} id={`past-events-slide-${event.id}`} className="min-w-full flex-shrink-0 px-1 sm:px-2">
                  <div id={`past-events-card-${event.id}`} className="relative group">
                    <img
                      id={`past-events-image-${event.id}`}
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-lg shadow-lg"
                    />
                    <div id={`past-events-overlay-${event.id}`} className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div id={`past-events-overlay-content-${event.id}`} className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                        <h3 id={`past-events-title-${event.id}`} className="text-white text-base sm:text-xl font-semibold">{event.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            id="past-events-prev-button"
            onClick={prevSlide}
            className="absolute left-1 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
            aria-label="Previous slide"
          >
            <svg id="past-events-prev-icon" className="w-5 h-5 sm:w-6 sm:h-6 text-tec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            id="past-events-next-button"
            onClick={nextSlide}
            className="absolute right-1 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
            aria-label="Next slide"
          >
            <svg id="past-events-next-icon" className="w-5 h-5 sm:w-6 sm:h-6 text-tec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div id="past-events-dots-container" className="flex justify-center mt-6 gap-2">
            {pastEvents.map((_, index) => (
              <button
                key={index}
                id={`past-events-dot-${index}`}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-tec-blue' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PastEventsCarousel

