import { CtaBand } from "./_components/CtaBand";
import { Features } from "./_components/Features";
import { Hero } from "./_components/Hero";
import { LogoMarquee } from "./_components/LogoMarquee";
import { Pricing } from "./_components/Pricing";
import { ResizeShowcase } from "./_components/ResizeShowcase";
import { TeamsSection } from "./_components/TeamsSection";
import { TemplateGallery } from "./_components/TemplateGallery";
import { Testimonials } from "./_components/Testimonials";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <LogoMarquee />
      <Features />
      <TemplateGallery />
      <ResizeShowcase />
      <TeamsSection />
      <Testimonials />
      <Pricing />
      <CtaBand />
    </main>
  );
}
