
import { useState, useEffect, useRef } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="section-padding bg-white">
      <div 
        ref={sectionRef} 
        className={`container mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md aspect-square max-w-md mx-auto">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Your Profile Image
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Who am I?</h3>
            <p className="text-gray-600">
              I am a passionate developer and designer with experience in creating beautiful, functional websites and applications. 
              With a background in [Your Background], I combine technical skills with creative problem-solving to deliver exceptional digital experiences.
            </p>
            <p className="text-gray-600">
              When I'm not coding, you can find me [Your Hobbies/Interests]. I believe in continuous learning and staying updated with the latest technologies and trends in the industry.
            </p>
            <div className="pt-4">
              <a href="#contact" className="btn-primary">
                Let's Work Together
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
