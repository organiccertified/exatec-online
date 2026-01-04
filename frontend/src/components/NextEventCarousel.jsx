import { useState, useEffect } from 'react'

const NextEventCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

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
    <section id="next-event-section" className="py-12 bg-gray-50">
      <div id="next-event-container" className="container mx-auto px-4">
        <h2 id="next-event-title" className="text-3xl font-bold text-tec-blue mb-8 text-center">Next Event</h2>
        <div id="next-event-carousel-wrapper" className="relative max-w-4xl mx-auto h-[600px]">
          <div id="next-event-carousel-container" className="overflow-hidden rounded-lg shadow-xl h-full">
            <div
              id="next-event-carousel-track"
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {events.map((event) => (
                <div key={event.id} id={`next-event-slide-${event.id}`} className="min-w-full flex-shrink-0 h-full">
                  <div id={`next-event-card-${event.id}`} className="bg-white rounded-lg overflow-hidden h-full">
                    <div id={`next-event-card-content-${event.id}`} className="md:flex h-full">
                      <div id={`next-event-image-wrapper-${event.id}`} className="md:w-1/2 h-full relative">
                        <img
                          id={`next-event-image-${event.id}`}
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          id={`next-event-register-button-${event.id}`}
                          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-tec-blue text-white px-8 py-3 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium shadow-lg"
                        >
                          Register
                        </button>
                      </div>
                      <div id={`next-event-text-wrapper-${event.id}`} className="md:w-1/2 p-8 flex flex-col justify-center h-full">
                        <p id={`next-event-date-${event.id}`} className="text-tec-blue font-semibold mb-2">{event.date}</p>
                        <h3 id={`next-event-card-title-${event.id}`} className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h3>
                        <p id={`next-event-description-${event.id}`} className="text-gray-600 mb-6">{event.description}</p>
                        <button id={`next-event-learn-more-${event.id}`} className="bg-tec-blue text-white px-6 py-2 rounded-lg hover:bg-tec-blue-dark transition-colors w-fit">
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Previous slide"
          >
            <svg id="next-event-prev-icon" className="w-6 h-6 text-tec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            id="next-event-next-button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Next slide"
          >
            <svg id="next-event-next-icon" className="w-6 h-6 text-tec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div id="next-event-dots-container" className="flex justify-center mt-6 gap-2">
            {events.map((_, index) => (
              <button
                key={index}
                id={`next-event-dot-${index}`}
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

export default NextEventCarousel

