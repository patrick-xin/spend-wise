import Image from "next/image";

function Interface() {
  return (
    <div className="px-[17px] md:px-[48px]">
      <div className="pt-[93px] pb-[84px] text-center">
        <div className="pb-[60px] space-y-5">
          <h2 className="font-bold text-center text-3xl md:text-5xl">
            Intuitive interface
          </h2>
          <p className="text-center max-w-2xl mx-auto text-lg md:text-xl">
            Celebrate the joy of accomplishment with an app designed to track
            your progress, motivate your efforts, and celebrate your successes,
            one task at a time.
          </p>
        </div>

        <div className="relative">
          <Image
            quality={100}
            alt="App-Night"
            height={2000}
            width={2000}
            src="/images/App-Night.png"
            className="object-cover size-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Interface;
