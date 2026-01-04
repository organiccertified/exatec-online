import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact-section" className="py-6 sm:py-12 bg-gray-50">
      <div id="contact-container" className="container mx-auto px-3 sm:px-4 max-w-2xl">
        <h1 id="contact-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-tec-blue mb-4 sm:mb-8 text-center">
          Contact Us
        </h1>
        <form id="contact-form" onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
          <div id="contact-name-field" className="mb-6">
            <label 
              id="contact-name-label" 
              htmlFor="contact-name-input" 
              className="block text-gray-700 font-medium mb-2"
            >
              Name:
            </label>
            <input
              id="contact-name-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue"
              required
            />
          </div>
          <div id="contact-subject-field" className="mb-6">
            <label 
              id="contact-subject-label" 
              htmlFor="contact-subject-input" 
              className="block text-gray-700 font-medium mb-2"
            >
              Subject:
            </label>
            <input
              id="contact-subject-input"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue"
              required
            />
          </div>
          <div id="contact-message-field" className="mb-6">
            <label 
              id="contact-message-label" 
              htmlFor="contact-message-input" 
              className="block text-gray-700 font-medium mb-2"
            >
              Message:
            </label>
            <textarea
              id="contact-message-input"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tec-blue resize-none"
              required
            />
          </div>
          <div id="contact-button-container" className="flex justify-center">
            <button
              id="contact-send-button"
              type="submit"
              className="bg-tec-blue text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-tec-blue-dark transition-colors font-medium text-base sm:text-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-tec-blue focus:ring-offset-2"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact

