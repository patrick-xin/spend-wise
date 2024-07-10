import { Button } from "../ui/button";
import { Input } from "../ui/input";

function InstantAccess() {
  return (
    <div className="h-[429px] bg-[#05020A]">
      <div className="py-[76px] max-w-2xl mx-auto space-y-5">
        <h2 className="font-bold text-center text-3xl md:text-5xl">
          Get instant access
        </h2>
        <p className="text-body-medium text-center text-[#BBBBBB] px-[29px]">
          Celebrate the joy of accomplishment with an app designed to track your
          progress and motivate your efforts.
        </p>
        <div className="px-[52.5px] mt-[40px] flex flex-col gap-2.5">
          <Input type="text" placeholder="name@email.com" />
          <Button>Get access</Button>
        </div>
      </div>
    </div>
  );
}

export default InstantAccess;
