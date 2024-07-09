import Image from "next/image";

function Interface() {
  return (
    <div className="px-[17px] md:px-[48px]">
      <div className="pt-[93px] pb-[84px] text-center">
        <div className="pb-[60px]">
          <h2 className="font-dm-sans font-bold text-center text-h2 mb-5 md:text-5xl">
            Intuitive interface
          </h2>
          <p className="text-body-large">
            Celebrate the joy of accomplishment with an app designed to track
            your progress, motivate your efforts, and celebrate your successes,
            one task at a time.
          </p>
        </div>

        <div className="relative">
          <Image
            alt="App-Night"
            height={2000}
            width={2000}
            src="/images/App-Night.png"
            className="object-cover size-full w-[356px] h-[220px] md:w-[704px] md:h-[437px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Interface;
