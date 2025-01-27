import MainAnimation from "../components/animations/MainAni";
import DeployableCreator from "../components/DeployableCreator";

export default function Home() {
  return (
    <main className="w-full h-full relative">
      <div className="w-full h-full flex flex-col justify-start items-center gap-20 p-10">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src="/nebula.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <h1
          className={`text-7xl`}
          style={{ fontFamily: "var(--font-doto), sans-serif" }}
        >
          Workspace Deployer Web
        </h1>
        <MainAnimation />
        <DeployableCreator />
      </div>
    </main>
  );
}
