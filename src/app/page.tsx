import MainDisplay from "../components/mainDisplay/MainDisplay";
import SideBar from "../components/sidebar/SideBar";
import StickyHeader from "../components/StickyHeader";
import { wakeupApi } from "../service/apiPingService";

export default async function Home() {
  wakeupApi();

  return (
    <>
      <StickyHeader />
      <main className="w-full h-[88%] relative flex">
        <SideBar />
        <div className="flex-grow flex justify-center items-center p-10">
          <MainDisplay />
        </div>
      </main>
    </>
  );
}
