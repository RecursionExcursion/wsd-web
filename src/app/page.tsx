import MainLayout from "../components/mainDisplay/MainLayout";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/Hero";
import SideBySide from "../components/SideBySide";

export default async function Home() {
  return (
    <div
      className="min-h-screen w-screen bg-cosmic-black text-milky-white flex flex-col overflow-hidden bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url(./space_bg.png)" }}
    >
      <Header />
      <main className="flex-1 overflow-hidden w-full relative">
        {/* Single continuous background gradient spanning all sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cosmic-black/20 to-slate-900 pointer-events-none"></div>
        
        <div className="relative z-10">
          <Hero />
          <SideBySide />
        </div>
        
        <MainLayout />
      </main>
      <Footer />
    </div>
  );
}
