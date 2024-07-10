import Acme from "../svgs/brands/acme";
import Apex from "../svgs/brands/apex";
import Celestial from "../svgs/brands/celestial";
import EchoValley from "../svgs/brands/echo-valley";
import Pulse from "../svgs/brands/pulse";
import Quantum from "../svgs/brands/quantum";

function Logos() {
  return (
    <div className="bg-black text-[#7A7A7A] h-[266px]">
      <p className="text-sm font-medium pb-[38px] text-center w-[185px] mx-auto">
        Trusted by the world’s most innovative teams
      </p>
      <div className="flex flex-wrap md:max-w-xl mx-auto justify-center gap-[38px] px-[24.5px] lg:max-w-max">
        <Acme />
        <Quantum />

        <EchoValley />
        <Celestial />

        <Pulse />
        <Apex />
      </div>
    </div>
  );
}

export default Logos;
