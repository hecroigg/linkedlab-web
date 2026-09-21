import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Projects } from "@/components/sections/Projects";
import { TrustProcess } from "@/components/sections/TrustProcess";
import { TestimonialsLocal } from "@/components/sections/TestimonialsLocal";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <BeforeAfter />
        <Projects />
        <TrustProcess />
        <TestimonialsLocal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
