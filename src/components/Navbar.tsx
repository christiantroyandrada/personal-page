
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold text-gray-900">Portfolio</a>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="text-gray-700 hover:text-blue-500 animate-underline">About</a>
          <a href="#skills" className="text-gray-700 hover:text-blue-500 animate-underline">Skills</a>
          <a href="#projects" className="text-gray-700 hover:text-blue-500 animate-underline">Projects</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-500 animate-underline">Contact</a>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4">
            <div className="flex flex-col items-center space-y-4">
              <a href="#about" className="text-gray-700 hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#skills" className="text-gray-700 hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Skills</a>
              <a href="#projects" className="text-gray-700 hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Projects</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
