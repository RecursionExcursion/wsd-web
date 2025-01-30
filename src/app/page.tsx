import { headers } from "next/headers";
import MainAnimation from "../components/animations/MainAni";
import DeployableCreator from "../components/DeployableCreator";
import SideBar from "../components/sidebar/SideBar";

export default async function Home() {
  return (
    <main className="w-full h-full relative flex">
      <SideBar />
      <div className="flex-grow flex flex-col justify-start items-center gap-20 p-10">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src="/nebula.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="bg-black bg-opacity-50 rounded-full p-4">
          <h1
            className={`text-7xl`}
            style={{ fontFamily: "var(--font-doto), sans-serif" }}
          >
            Workspace Deployer Web
          </h1>
        </div>
        <MainAnimation />
        <DeployableCreator supportedOs={await getSupportedOs()} />
      </div>
    </main>
  );
}

const getSupportedOs = async () => {
  const host = (await headers()).get("host");

  // console.log({ url: });

  const protocol = process.env.ENV === "DEV" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/os`);

  if (!res.ok) {
    return [];
  }

  return (await res.json()) as string[];
  // return [];
};
