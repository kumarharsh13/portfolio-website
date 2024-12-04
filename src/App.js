import "./App.css";
import Navigation from "../src/components/navigation/Navigation";
import HeroSection from "./components/heroSection/HeroSection";
import AboutSection from "./components/aboutSection/AboutSection";
import ProjectSection from "./components/projectSection/ProjectSection";

function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectSection />
    </div>
  );
}

export default App;
