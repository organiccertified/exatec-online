const Footer = () => {
  return (
    <footer id="footer-main" className="bg-tec-blue text-white py-6">
      <div id="footer-container" className="container mx-auto px-4">
        <div id="footer-content" className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div id="footer-version" className="text-sm">
            Version 1.0.0
          </div>
          <div id="footer-credit" className="text-sm">
            Created by Integra Sites
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

