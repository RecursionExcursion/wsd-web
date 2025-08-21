import MainLayout from "../components/mainDisplay/MainLayout";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/Hero";
import SideBySide from "../components/SideBySide";
import About from "../components/About";
import Documentation from "../components/Documentation";
import Accordion from "@/components/Accordion";

export default async function Home() {
  return (
    <div className="min-h-screen w-screen bg-cosmic-black text-milky-white flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-hidden w-full relative">
        {/* TODO rm */}
        {/* Single continuous background gradient spanning all sections */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cosmic-black/20 to-slate-900 pointer-events-none"></div> */}

        <div className="relative z-10">
          <Hero />
          <SideBySide leftChild={<About />} rightChild={<Accordion />} />
        </div>
        <MainLayout />
      </main>
      <Footer />
    </div>
  );
}
