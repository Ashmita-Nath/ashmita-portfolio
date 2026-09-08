import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import FeaturedProjects from "./components/FeaturedProjects";
import SDESection from "./components/SDESection";
import DataSection from "./components/DataSection";
import AISection from "./components/AISection";
import UXSection from "./components/UXSection";
import Skills from "./components/Skills";
import Research from "./components/Research";
import DevProfile from "./components/DevProfile";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ProjectsProvider } from "./context/ProjectsContext";

export default function App() {
  return (
    <ProjectsProvider>
      <div className="min-h-screen bg-bg bg-noise" style={{ backgroundColor: "var(--color-bg)" }}>
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <FeaturedProjects />
          <SDESection />
          <DataSection />
          <AISection />
          <UXSection />
          <Skills />
          <Research />
          <DevProfile />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </ProjectsProvider>
  );
}
