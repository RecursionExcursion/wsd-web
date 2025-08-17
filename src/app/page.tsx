import MainAnimation from "../components/animations/MainAni";
import LogoTitle from "../components/LogoTitle";
import MainLayout from "../components/mainDisplay/MainLayout";

export default async function Home() {
  return (
    <main className="h-screen">
      {/* <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/nebula.mp4"
        autoPlay
        loop
        muted
        playsInline
      /> */}

      <div className="flex flex-col h-screen w-full bg-cosmos">
        <div className="flex w-full justify-between items-center px-4 py-8 lg:px-8 lg:py-16">
          <LogoTitle text="Quick Script" />
          <div className="px-10 w-full">
            <MainAnimation />
          </div>
        </div>
        <div className="h-4 "></div>
        <MainLayout />
      </div>
    </main>
  );
}
