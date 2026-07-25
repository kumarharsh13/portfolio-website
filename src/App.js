import React, { useState, useEffect, lazy } from 'react';

import "./App.css";
import Navigation from "../src/components/navigation/Navigation";
import CanvasScene from "./components/three/CanvasScene";
import HeroSection from "./components/heroSection/HeroSection";
import AboutSection from "./components/aboutSection/AboutSection";
import ProjectSection from "./components/projectSection/ProjectSection";
import CertificateSection from "./components/certificateSection/CertificateSection";
import FooterSection from "./components/footerSection/FooterSection";

const HeroBackground = lazy(() => import("./components/three/HeroBackground"));

function App() {
  const [inView, setInView] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            setInView(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="App">
      <div className="globalBg">
        <CanvasScene fallback={null} camera={{ position: [0, 0, 5], fov: 60 }}>
          <HeroBackground />
        </CanvasScene>
      </div>
      <Navigation inView={inView} />
      <section id="home">
        <HeroSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="projects">
        <ProjectSection />
      </section>
      <section id="certificates">
        <CertificateSection />
      </section>
      <section id="contact">
        <FooterSection />
      </section>
    </div>
  );
}

export default App;
