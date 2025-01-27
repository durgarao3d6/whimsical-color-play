import Navigation from "../components/Navigation";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ContactSection from "../components/sections/ContactSection";
import BackToTop from "../components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f4ea] to-white">
      <Navigation />
      
      <main className="container mx-auto px-4">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <BackToTop />
    </div>
  );
};

export default Index;