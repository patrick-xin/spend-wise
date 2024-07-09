import Banner from "@/components/banner";
import FAQ from "@/components/landing/faq";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import InstantAccess from "@/components/landing/instant-access";
import Interface from "@/components/landing/interface";
import Logos from "@/components/landing/logos";
import Navbar from "@/components/landing/navbar";

function AboutPage() {
  return (
    <div>
      <Banner />
      <Navbar />
      <Hero />
      <Logos />
      <Features />
      <div className="feature-gradient">
        <Interface />
        <FAQ />
      </div>
      <InstantAccess />
    </div>
  );
}

export default AboutPage;
