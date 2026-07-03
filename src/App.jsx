import { useEffect } from 'react';
import './index.css';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Gallery from './components/Gallery';
import Videos from './components/Videos';
import Impact from './components/Impact';
import Support from './components/Support';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', window.pageYOffset || window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Programs />
        <Gallery />
        <Videos />
        <Impact />
        <Support />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
