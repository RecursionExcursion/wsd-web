import MainLayout from "../components/mainDisplay/MainLayout";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/Hero";
import Accordion from "@/components/Accordion";
// import Image from "next/image";


export default async function Home() {
  return (
    <div className="min-h-screen w-screen text-milky-white flex flex-col">
      <Header />
      <main className="flex-1 w-full relative">
        {/* TODO rm */}
        <div className="relative z-10">
          <Hero />
          <Accordion />
        </div>
        <MainLayout />
      </main>
      <Footer />
    </div>
  );
}
