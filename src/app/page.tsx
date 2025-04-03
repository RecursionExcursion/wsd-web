import MainAnimation from "../components/animations/MainAni";
import Card from "../components/Card";
import { HowToUseDisplay } from "../components/HowToUse";
import LogoTitle from "../components/LogoTitle";
import MainDisplay from "../components/mainDisplay/MainDisplay";
import DeployableMenu from "../components/sidebar/DeployableMenu";
import { wakeupApi } from "../service/apiPingService";

export default async function Home() {
  wakeupApi();

  return (
    <>
      <main className="w-full h-full relative flex flex-col p-10">
        <div className="flex items-center gap-10">
          <LogoTitle />
          <MainAnimation />
        </div>
        <div className="flex-grow flex justify-center items-center p-10 gap-5">
          <div className="flex flex-col gap-5 w-[30%]">
            <Card>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Menu</h2>
                <div
                  id="connection-status"
                  className="flex w-full h-10 items-center justify-center"
                ></div>
                <DeployableMenu type="saved" />
                <DeployableMenu type="last" />
              </div>
            </Card>
            <Card>
              <HowToUseDisplay />
            </Card>
          </div>
          <div className="flex justify-center w-[70%]">
            <Card>
              <MainDisplay />
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
