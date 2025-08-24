import MainLayout from "../components/mainDisplay/MainLayout";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/Hero";
import Accordion from "@/components/Accordion";
import Image from "next/image";


export default async function Home() {
  return (
    <div className="min-h-screen w-screen text-milky-white flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-hidden w-full relative">
        {/* TODO rm */}
        {/* Single continuous background gradient spanning all sections */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cosmic-black/20 to-slate-900 pointer-events-none"></div> */}

        <div className="relative z-10">
          <Hero />
          <Accordion />
        </div>
        <MainLayout />
        <Image
          id="spaceship"
          src="/spaceship_graphic.svg"
          alt="Spaceship"
          width={200}
          height={200}
          className="floating-spaceship absolute bottom-0 right-0 max-w-full h-auto"
        />
      </main>
      <Footer />
    </div>
  );
}
