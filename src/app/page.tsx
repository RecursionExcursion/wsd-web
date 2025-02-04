import MainAnimation from "../components/animations/MainAni";
import MainDisplay from "../components/mainDisplay/MainDisplay";
import SideBar from "../components/sidebar/SideBar";
import { awakenAPI } from "../service/apiWakeUpService";

export default async function Home() {
  awakenAPI();
  return (
    <main className="w-full h-full relative flex">
      <SideBar />
      <div className="flex-grow flex flex-col justify-start items-center gap-10 p-10">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src="/nebula.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="bg-black bg-opacity-50 rounded-full p-4 mt-3">
          <h1
            className={`text-7xl`}
            style={{ fontFamily: "var(--font-doto), sans-serif" }}
          >
            Workspace Deployer Web
          </h1>
        </div>
        <MainAnimation />
        <MainDisplay />
      </div>
    </main>
  );
}
