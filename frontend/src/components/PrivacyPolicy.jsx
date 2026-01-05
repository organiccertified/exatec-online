import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
  return (
    <section id="privacy-policy-section" className="py-6 sm:py-12 bg-gray-50">
      <div id="privacy-policy-container" className="container mx-auto px-3 sm:px-4 max-w-4xl">
        <h1 id="privacy-policy-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-tec-blue mb-4 sm:mb-8 text-center">
          Privacy Policy
        </h1>
        
        <div id="privacy-policy-content" className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 space-y-6">
          <div id="privacy-policy-last-updated" className="text-sm text-gray-600 italic">
            Last Updated: December 19, 2024
          </div>

          <div id="privacy-policy-intro">
            <h2 className="text-xl font-bold text-tec-blue mb-3">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Exatec.online ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personally identifiable information (PII) when you use our website.
            </p>
          </div>

          <div id="privacy-policy-collection">
            <h2 className="text-xl font-bold text-tec-blue mb-3">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We collect the following types of personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Name (First Name and Last Name)</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Campus Information</li>
              <li>Degree Information</li>
              <li>Graduation Year</li>
              <li>Association/Chapter Preference</li>
            </ul>
          </div>

          <div id="privacy-policy-usage">
            <h2 className="text-xl font-bold text-tec-blue mb-3">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the personal information you provide to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Register you for events and activities</li>
              <li>Send you communications about upcoming events and news</li>
              <li>Manage your association membership</li>
              <li>Improve our services and website</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div id="privacy-policy-storage">
            <h2 className="text-xl font-bold text-tec-blue mb-3">Data Storage and Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We collect and store personal information submitted through our forms. Your data is stored securely and is only accessible to authorized personnel. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>

          <div id="privacy-policy-cookies">
            <h2 className="text-xl font-bold text-tec-blue mb-3">Cookies and Analytics</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website uses Google AdSense, which may use cookies and similar technologies to serve personalized advertisements. These cookies help us understand how visitors interact with our site and enable us to provide relevant advertising. You can manage your cookie preferences through your browser settings.
            </p>
          </div>

          <div id="privacy-policy-sharing">
            <h2 className="text-xl font-bold text-tec-blue mb-3">Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
              <li>Service providers who assist us in operating our website and conducting our business</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </div>

          <div id="privacy-policy-rights">
            <h2 className="text-xl font-bold text-tec-blue mb-3">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of communications</li>
            </ul>
          </div>

          <div id="privacy-policy-contact">
            <h2 className="text-xl font-bold text-tec-blue mb-3">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us through our <Link to="/contact" className="text-tec-blue hover:underline">Contact page</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy

