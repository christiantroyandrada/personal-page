
import { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink: string;
  codeLink: string;
  featured: boolean;
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
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

  const projects: Project[] = [
    {
      title: "E-Commerce Website",
      description: "A fully responsive e-commerce platform with product filtering, cart functionality, and payment integration.",
      image: "https://source.unsplash.com/random/800x600/?ecommerce",
      tags: ["React", "Node.js", "MongoDB"],
      liveLink: "#",
      codeLink: "#",
      featured: true
    },
    {
      title: "Task Management App",
      description: "A productivity app that helps users organize tasks with drag-and-drop functionality and reminders.",
      image: "https://source.unsplash.com/random/800x600/?tasks",
      tags: ["React", "Firebase", "TypeScript"],
      liveLink: "#",
      codeLink: "#",
      featured: true
    },
    {
      title: "Portfolio Website",
      description: "A clean and modern portfolio website built with React and Tailwind CSS.",
      image: "https://source.unsplash.com/random/800x600/?portfolio",
      tags: ["React", "Tailwind CSS"],
      liveLink: "#",
      codeLink: "#",
      featured: false
    },
    {
      title: "Weather App",
      description: "A weather application that provides current and forecast weather data for any location.",
      image: "https://source.unsplash.com/random/800x600/?weather",
      tags: ["JavaScript", "API", "CSS"],
      liveLink: "#",
      codeLink: "#",
      featured: false
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : activeFilter === 'featured' 
      ? projects.filter(project => project.featured) 
      : projects.filter(project => !project.featured);

  return (
    <section id="projects" className="section-padding bg-white">
      <div 
        ref={sectionRef} 
        className={`container mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Check out some of my recent work. Each project represents my passion for creating elegant solutions to complex problems.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="inline-flex border border-gray-300 rounded-md overflow-hidden">
            <button 
              className={`px-6 py-2 text-sm font-medium ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveFilter('all')}
            >
              All Projects
            </button>
            <button 
              className={`px-6 py-2 text-sm font-medium ${activeFilter === 'featured' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveFilter('featured')}
            >
              Featured Work
            </button>
            <button 
              className={`px-6 py-2 text-sm font-medium ${activeFilter === 'other' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveFilter('other')}
            >
              Other Projects
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className={`project-card transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img src={project.image} alt={project.title} />
                {project.featured && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded-full mr-2 mb-2">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a 
                    href={project.liveLink} 
                    className="text-blue-500 font-medium hover:underline inline-flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo <ExternalLink size={16} className="ml-1" />
                  </a>
                  <a 
                    href={project.codeLink} 
                    className="text-gray-600 font-medium hover:underline inline-flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source Code <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
