import "./App.css";
import Navigation from "../src/components/navigation/Navigation";
import HeroSection from "./components/heroSection/HeroSection";
import AboutSection from "./components/aboutSection/AboutSection";
import ProjectSection from "./components/projectSection/ProjectSection";
import CertificateSection from "./components/certificateSection/CertificateSection";
import FooterSection from "./components/footerSection/FooterSection";

function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <CertificateSection />
      <FooterSection />
    </div>
  );
}

export default App;
