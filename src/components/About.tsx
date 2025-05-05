import { useState, useEffect, useRef } from 'react';

const About = ({ photo }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isVisible || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    console.log(`About: ${JSON.stringify(photo)}`)
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible, photo]);

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
          {/* Photo Section */}
          <div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md aspect-square max-w-md mx-auto flex items-center justify-center">
              {photo?.photo_address ? (
                <img
                  src={photo.photo_address}
                  alt={photo.photo_name || 'User Photo'}
                  className="w-full h-full object-cover rounded-md"
                  loading="lazy"
                />
              ) : (
                <div className="text-gray-400 text-center">Your Photo</div>
              )}
            </div>
          </div>

          {/* Text Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Who am I?</h3>
            <p className="text-gray-600">
              I am a passionate developer and designer with experience in creating beautiful, functional websites and applications.
              With a background in Web Development and IT Operations, I combine technical skills with creative problem-solving to deliver exceptional digital experiences.
            </p>
            <p className="text-gray-600">
              When I'm not coding, you can find me diving into car research or working on side projects. I believe in lifelong learning and always staying up to date with the latest technologies — especially the ones that excite me.
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
