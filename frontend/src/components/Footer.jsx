const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#d4e8cd] text-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* brand */}
          <div>
            <h3 className="text-primary-800 text-lg font-semibold mb-2">CaloryInsight</h3>
            <p className="text-sm text-gray-600">
              Your personal health companion. Track calories, calculate BMI, and make informed food choices.
            </p>
          </div>

          {/* quick links */}
          <div>
            <h4 className="text-primary-800 font-medium mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="/about" className="hover:text-primary-600 transition-colors">About Us</a></li>
              <li><a href="/services" className="hover:text-primary-600 transition-colors">Our Services</a></li>
              <li><a href="/contact" className="hover:text-primary-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* tools */}
          <div>
            <h4 className="text-primary-800 font-medium mb-2">Tools</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="/calorie-burn" className="hover:text-primary-600 transition-colors">Calorie Calculator</a></li>
              <li><a href="/bmi" className="hover:text-primary-600 transition-colors">BMI Calculator</a></li>
              <li><a href="/food-search" className="hover:text-primary-600 transition-colors">Food Finder</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#dce3ca] mt-6 pt-4 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} CaloryInsight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
