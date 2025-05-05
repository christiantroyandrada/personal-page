import { useEffect, useState } from "react";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { setupScrollReveal } from '@/utils/scrollReveal';
import Fetch from '@/utils/fetchFunctions'

const Index = () => {
  const [photo, setPhoto] = useState(null);
  const [bucketPhoto, setBucketPhoto] = useState(null);

  useEffect(() => {
    const cleanup = setupScrollReveal();
    document.title = 'Your Name - Portfolio';
    Fetch.getPhotos(setPhoto);
    Fetch.getPhotosFromBucket(setBucketPhoto);
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero photo={photo} />
      <About photo={bucketPhoto} />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
