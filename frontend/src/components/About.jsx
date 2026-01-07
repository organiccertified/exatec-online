const About = ({ selectedOrg }) => {
  return (
    <section id="about-section" className="py-6 sm:py-12 bg-gray-50">
      <div id="about-container" className="container mx-auto px-3 sm:px-4">
        <h1 id="about-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-tec-blue mb-4 sm:mb-8 text-center">
          About Us
        </h1>
        <div id="about-content" className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <div id="about-description" className="space-y-4 sm:space-y-6">
            <p id="about-description-text" className="text-base sm:text-lg text-gray-700 leading-relaxed">
              This site helps the Tec de Monterrey Alumni Association in <span id="about-city" className="font-semibold text-tec-blue">{selectedOrg}</span> to manage the events and the active members.
            </p>
            <p id="about-members-text" className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Currently this Association has an approximation of <span id="about-members-count" className="font-semibold text-tec-blue">100</span> members.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

