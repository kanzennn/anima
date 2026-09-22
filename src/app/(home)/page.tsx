import { ClientMarquee } from "./_components/ClientMarquee";
import { ContactCta } from "./_components/ContactCta";
import { Hero } from "./_components/Hero";
import { Process } from "./_components/Process";
import { Services } from "./_components/Services";
import { Testimonials } from "./_components/Testimonials";
import { Work } from "./_components/Work";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <ClientMarquee />
      <Work />
      <Services />
      <Process />
      <Testimonials />
      <ContactCta />
    </main>
  );
}
