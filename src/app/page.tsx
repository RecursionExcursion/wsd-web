import MainAnimation from "../components/animations/MainAni";
import Image from "next/image";
import Card from "../components/base/Card";
import { HowToUseDisplay } from "../components/HowToUse";
import LogoTitle from "../components/LogoTitle";
import MainDisplay from "../components/mainDisplay/MainDisplay";
import DeployableMenu from "../components/sidebar/DeployableMenu";

export default async function Home() {
  return (
    <main
      className="w-full h-full relative flex flex-col bg-center bg-cover bg-no-repeat bg-fixed items-center justify-center pb-12 backdrop-brightness-50"
      style={{ backgroundImage: `url('/hero_background.webp')` }}
    >
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="/nebula.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full object-cover -z-10">
        <Image src={"/hero_background.webp"} alt="swoop" fill />
      </div>
      <div className="bg-black flex md:flex-col sm:flex-row p-8 items-center justify-center gap-10">
        <LogoTitle text="Workspace Deployer" />
        <div className="w-[70%] m-auto">
          <MainAnimation />
        </div>
      </div>
      <div
        className="flex-grow flex flex-col lg:flex-row
                     justify items-center sm:mx-auto my-auto
                     gap-5 lg:gap-0
                     p-8
                     mt-10 lg:mt-0
                     "
      >
        {/* 2 vertical cards on the Left */}
        <div className="flex flex-col gap-5 w-[70%] lg:w-[30%] overflow-y-auto">
          <Card height="20rem">
            <HowToUseDisplay />
          </Card>
          <Card height="20rem">
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-semibold">Menu</h2>
              <div
                id="connection-status"
                className="flex w-full h-10 items-center justify-center"
              ></div>
              <DeployableMenu type="saved" />
              <DeployableMenu type="last" />
            </div>
          </Card>
        </div>
        <div className="flex justify-center w-[70%]">
          <Card height="40rem">
            <MainDisplay />
          </Card>
        </div>
      </div>
    </main>
  );
}
