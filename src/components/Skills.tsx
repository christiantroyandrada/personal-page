
import { useState, useEffect, useRef } from 'react';

const Skills = () => {
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

  const skills = [
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "Node.js", level: 70 },
    { name: "UI/UX Design", level: 85 },
  ];

  const otherSkills = [
    "Tailwind CSS", "Git", "RESTful API", "Figma", "Firebase", 
    "GraphQL", "Jest", "Responsive Design", "AWS", "Docker"
  ];

  return (
    <section id="skills" className="section-padding bg-gray-50">
      <div 
        ref={sectionRef} 
        className={`container mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Here are some of the technologies and tools I work with. I'm always learning new skills and improving existing ones.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-xl font-bold mb-8">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-8">Other Skills</h3>
            <div className="flex flex-wrap">
              {otherSkills.map((skill, index) => (
                <span key={index} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
            
            <h3 className="text-xl font-bold mt-12 mb-6">Education</h3>
            <div className="space-y-6">
              <div className="border-l-2 border-blue-500 pl-4">
                <p className="text-blue-500 font-medium">2020 - 2022</p>
                <h4 className="text-lg font-bold">Master's Degree in Computer Science</h4>
                <p className="text-gray-600">University Name</p>
              </div>
              
              <div className="border-l-2 border-blue-500 pl-4">
                <p className="text-blue-500 font-medium">2016 - 2020</p>
                <h4 className="text-lg font-bold">Bachelor's Degree in Computer Science</h4>
                <p className="text-gray-600">University Name</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
