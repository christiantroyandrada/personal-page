
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 z-0"></div>
      <div className="container mx-auto px-6 md:px-12 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <p className="text-blue-500 font-medium">Hello, I'm</p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Name
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-lg md:max-w-xl">
              A passionate developer & designer creating digital experiences that people love
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <a href="#projects" className="btn-primary">
                View My Work
              </a>
              <a href="#contact" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
                Contact Me
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="bg-white p-2 rounded-full shadow-xl max-w-xs mx-auto md:max-w-none">
              <div className="rounded-full overflow-hidden aspect-square bg-gray-200">
                {/* Replace with your image */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Your Photo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll to About section"
      >
        <ArrowDown size={32} className="text-gray-400" />
      </a>
    </section>
  );
};

export default Hero;
