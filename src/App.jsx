import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Tools from './components/Tools';
import Thoughts from './components/Thoughts';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GradientBlindsBackground from './components/background/GradientBlindsBackground';
import { portfolioData } from './data/portfolioData';

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-root">
      <GradientBlindsBackground />
      <div className="site-shell">
        <Header profile={portfolioData.profile} />
        <main>
          <Hero
            profile={portfolioData.profile}
            metrics={portfolioData.metrics}
            keywords={portfolioData.keywords}
          />
          <Projects projects={portfolioData.projects} />
          <Experience
            experience={portfolioData.experience}
            education={portfolioData.education}
            languages={portfolioData.languages}
            interests={portfolioData.interests}
          />
          <Tools tools={portfolioData.tools} />
          <Thoughts thoughts={portfolioData.thoughts} />
          <Contact profile={portfolioData.profile} contact={portfolioData.contact} />
        </main>
        <Footer profile={portfolioData.profile} />
      </div>
    </div>
  );
}

export default App;
