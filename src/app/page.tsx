import MainLayout from "../components/mainDisplay/MainLayout";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/Hero";

export default async function Home() {
  return (
    <div className="min-h-screen w-screen bg-cosmic-black text-milky-white flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-hidden w-full">
        <Hero />
        <section className="py-16 lg:py-24 bg-gradient-to-b from-cosmic-black to-nebula-purple/20 overflow-hidden w-full">
          <div className="max-w-7xl mx-auto px-4 lg:px-24 overflow-hidden w-full">
            <MainLayout />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
