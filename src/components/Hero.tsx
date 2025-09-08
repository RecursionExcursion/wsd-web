import Image from "next/image";
// import MainAnimation from "./animations/MainAni";
import Button from "./base/Button";

type HeroProps = {
  className?: string;
};

export default function Hero({ className = "" }: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden w-full ${className} bg-[url('/space_bg.png')] bg-cover bg-no-repeat bg-center`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-cosmic-black pointer-events-none z-10"
        aria-hidden="true"
      />
      <div className="mx-auto py-4 lg:pb-24 px-4 lg:px-24 overflow-hidden w-full relative z-20">
        <div className="w-full py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left min-w-0 overflow-hidden">
            <h2 className="text-4xl lg:text-6xl font-bold text-milky-white mb-6">
              Deploy Your Workspace with
              <span className="text-starlight-yellow block">
                Cosmic Efficiency
              </span>
            </h2>
            <p className="text-xl text-muted-lavender mb-8 max-w-2xl">
              {`Create reusable executable scripts that transform your development
              workflow. From simple automation to complex deployments, we've got
              you covered.`}
            </p>
            {/* <div className="w-full max-w-md">
              <MainAnimation />
            </div> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <Button variant="primary">Start Building</Button>
              <Button variant="secondary">View Examples</Button>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center lg:justify-center min-w-0 overflow-visible">
            <div className="relative overflow-visible w-[500px] h-[500px] flex items-center justify-center">
              <Image
                id="astronaut"
                src="/astronaut_graphic.svg"
                alt="Astronaut"
                width={500}
                height={500}
                className="floating-astronaut z-10 relative max-w-full h-auto"
              />
              <Image
                src="/planet_graphic.svg"
                alt="Planet 1"
                width={220}
                height={220}
                className="absolute bottom-2 max-w-full h-auto"
              />
              <Image
                src="/yellow_moon_graphic.svg"
                alt="Planet 1"
                width={20}
                height={20}
                className="absolute bottom-48 right-48 max-w-full h-auto"
              />
              <Image
                src="/purple_moon_graphic.svg"
                alt="Planet 1"
                width={30}
                height={30}
                className="absolute bottom-44 right-50   max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
