import Acme from "../svgs/brands/acme";
import Apex from "../svgs/brands/apex";
import Celestial from "../svgs/brands/celestial";
import EchoValley from "../svgs/brands/echo-valley";
import Pulse from "../svgs/brands/pulse";
import Quantum from "../svgs/brands/quantum";

function Logos() {
  return (
    <div className="bg-black text-[#7A7A7A] h-[266px]">
      <p className="text-sm pb-[38px] text-center w-[185px] mx-auto">
        Trusted by the world’s most innovative teams
      </p>
      <div className="space-y-3 px-[24.5px]">
        <div className="gap-x-[38px] flex items-center justify-center">
          <Acme />
          <Quantum />
        </div>
        <div className="gap-x-[38px] flex items-center justify-center">
          <EchoValley />
          <Celestial />
        </div>
        <div className="gap-x-[38px] flex items-center justify-center">
          <Pulse />
          <Apex />
        </div>
      </div>
    </div>
  );
}

export default Logos;
