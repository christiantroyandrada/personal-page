
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">Portfolio</h3>
            <p className="text-gray-400 mt-2">Creating beautiful digital experiences</p>
          </div>
          
          <div className="text-center md:text-right">
            <button 
              onClick={scrollToTop}
              className="p-2 bg-blue-500 rounded-full mb-4 hover:bg-blue-600 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
            <div>
              <p className="text-gray-400">
                &copy; {currentYear} Your Name. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
