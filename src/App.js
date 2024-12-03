import "./App.css";
import Navigation from "../src/components/navigation/Navigation";
import HeroSection from "./components/heroSection/HeroSection";
import AboutSection from "./components/aboutSection/AboutSection";

function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <AboutSection />
    </div>
  );
}

export default App;
