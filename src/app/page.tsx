import MainAnimation from "../components/animations/MainAni";
import MainDisplay from "../components/mainDisplay/MainDisplay";
import SideBar from "../components/sidebar/SideBar";
import { awakenAPI } from "../service/apiWakeUpService";

export default async function Home() {
  awakenAPI();
  return (
    <main className="w-full h-full relative flex overflow-x-hidden">
      <div className="flex flex-col md:flex-row flex-grow justify-between w-full">
        <SideBar />
        <MainDisplay />
      </div>
    </main>
  );
}
