import MainAnimation from "../components/animations/MainAni";
import LogoTitle from "../components/LogoTitle";
import MainLayout from "../components/mainDisplay/MainLayout";

export default async function Home() {
  return (
    <main className="grid grid-cols-[10%_80%_10%] h-screen">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="/nebula.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div></div>
      <div className="flex flex-col gap-5 h-screen bg-[var(--color-primary)]">
        <div className="flex w-full justify-between items-center px-4">
          <LogoTitle text="Quick Script" />
          <div className="px-10 w-full">
            <MainAnimation />
          </div>
        </div>
        <div className="border border-white px-4"></div>
        <MainLayout />
      </div>
      <div></div>
    </main>
  );
}
