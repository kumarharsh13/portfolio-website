import React, { useEffect, useState } from 'react';
import Dock from '../components/ui/Dock';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import SECTIONS from '../config/sections';
import LandingSection from '../components/landing/LandingSection';
import ThinkSection from '../components/thinkSection/ThinkSection';
import ExperienceSection from '../components/experienceSection/ExperienceSection';
import CaseStudiesSection from '../components/caseStudies/CaseStudiesSection';
import NotesSection from '../components/notesSection/NotesSection';
import ExploringSection from '../components/exploringSection/ExploringSection';
import AchievementsSection from '../components/achievementsSection/AchievementsSection';
import FooterSection from '../components/footerSection/FooterSection';

export default function Home({ paletteOpen }) {
  const [inView, setInView] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            setInView(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const shortcutMap = React.useMemo(() => {
    const m = {};
    SECTIONS.forEach((s) => { if (s.shortcut) m[s.shortcut] = () => scrollTo(s.id); });
    return m;
  }, []);
  useKeyboardShortcuts(shortcutMap, { enabled: !paletteOpen });

  return (
    <>
      <Dock activeId={inView} onNavigate={scrollTo} />
      <section id="home"><LandingSection /></section>
      <section id="think"><ThinkSection /></section>
      <section id="experience"><ExperienceSection /></section>
      <section id="projects"><CaseStudiesSection /></section>
      <section id="notes"><NotesSection /></section>
      <section id="exploring"><ExploringSection /></section>
      <section id="achievements"><AchievementsSection /></section>
      <section id="contact"><FooterSection /></section>
    </>
  );
}
