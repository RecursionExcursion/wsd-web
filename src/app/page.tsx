import MainAnimation from "../components/animations/MainAni";
import Card from "../components/base/Card";
import { HowToUseDisplay } from "../components/HowToUse";
import LogoTitle from "../components/LogoTitle";
import MainDisplay from "../components/mainDisplay/MainDisplay";
import DeployableMenu from "../components/sidebar/DeployableMenu";

export default async function Home() {
  return (
    <main className="w-full h-full relative flex flex-col sm:p-10">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="/nebula.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div
        className="flex flex-col sm:flex-row 
                        pt-5 sm:pt-0
                        items-center gap-10"
      >
        <LogoTitle text="Workspace Deployer" />
        <MainAnimation />
      </div>
      <div
        className="flex-grow flex flex-col lg:flex-row
                     justify items-center sm:mx-auto my-auto
                     gap-5 lg:gap-0
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
