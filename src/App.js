import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import "./App.css";
import GridBackground from "./components/ui/GridBackground";
import NoiseOverlay from "./components/ui/NoiseOverlay";
import Spotlight from "./components/ui/Spotlight";
import Loader from "./components/ui/Loader";
import ScrollProgress from "./components/ui/ScrollProgress";
import BackToTop from "./components/ui/BackToTop";
import CustomCursor from "./components/ui/CustomCursor";
import CardSpotlight from "./components/ui/CardSpotlight";
import Brand from "./components/ui/Brand";
import CommandPalette from "./components/ui/CommandPalette";
import Home from "./pages/Home";
import CaseStudyList from "./pages/CaseStudyList";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import NoteList from "./pages/NoteList";
import NoteDetail from "./pages/NoteDetail";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPaletteOpen((o) => !o); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="App">
      <Loader />
      <CustomCursor />
      <CardSpotlight />
      <ScrollProgress />
      <div className="globalBg"><GridBackground /></div>
      <NoiseOverlay />
      <Spotlight />
      <Brand onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home paletteOpen={paletteOpen} />} />
        <Route path="/case-studies" element={<CaseStudyList />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/notes" element={<NoteList />} />
        <Route path="/notes/:slug" element={<NoteDetail />} />
        <Route path="*" element={<Home paletteOpen={paletteOpen} />} />
      </Routes>

      <BackToTop />
    </div>
  );
}

export default App;
