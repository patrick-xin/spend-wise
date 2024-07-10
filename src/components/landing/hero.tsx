import Tag from "../tag";

function Hero() {
  return (
    <div className="relative dark:hero-gradient overflow-hidden h-[616px] md:h-[731px]">
      <div className="hidden md:block">
        <div className="absolute top-[166px] -left-[48px] lg:left-[220px] lg:top-[240px]">
          <div className="w-[181.2px] h-[183px] relative">
            <img
              className="object-contain size-full"
              src="/images/cursor-2.png"
            />
          </div>
        </div>
        <div className="absolute top-[200px] -right-[18px] lg:top-[210px] lg:right-[190px]">
          <div className="w-[140.4px] h-[140px] lg:h-[200px] lg:w-[200px] relative">
            <img
              className="object-fill size-full"
              src="/images/message-1.png"
            />
          </div>
        </div>
      </div>
      <div className="mx-[28px] md:mx-[28px] mt-[64px] mb-[90px] max-w-6xl lg:mx-auto">
        <div className="space-y-8">
          <div className="text-center">
            <Tag />
          </div>
          <h1
            className="text-white ml-[26px] mr-[26px] font-bold text-balance text-center 
          text-[54px] leading-[50px]
          md:text-[144px] md:leading-[120px] md:tracking-[-2.5%]
          lg:text-[165px] lg:leading-[125px] lg:tracking-[-7.5%]"
          >
            One Task at a Time
          </h1>
          <p className="text-[21px] leading-[31px] mx-auto text-center w-[335px] md:w-[457px] lg:w-auto max-w-xl">
            Celebrate the joy of accomplishment with an app designed to track
            your progress, motivate your efforts, and celebrate your successes.
          </p>
          <div className="flex justify-center">
            <button className="z-50 px-5 py-[15px] font-bold rounded-xl bg-white text-black border border-white/20">
              Get for free
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bg-[radial-gradient(closest-side,#000_82%,#9560EB)] border border-[#B48CDE] top-[480px] h-[375px] w-[909px] md:h-[1014px] md:w-[1924px] md:top-[591px] lg:top-[570px] lg:w-[2344px] xl:w-[3344px] rounded-[100%] left-1/2 -translate-x-1/2" />
    </div>
  );
}

export default Hero;
