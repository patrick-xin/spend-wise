import { LeafIcon } from "lucide-react";
import LeaveIcon from "../svgs/leave";

function Features() {
  return (
    <div className="px-[15px] md:px-[48px]">
      <div className="space-y-5 pt-[82px] pb-[101px] md:mx-[40.5px] md:pb-[68px]">
        <h2 className="font-dm-sans font-bold text-center text-h2 mb-5 md:text-5xl">
          Everything you need
        </h2>
        <p className="text-body-large text-center">
          Enjoy customizable lists, team work tools, and smart tracking all in
          one place. Set tasks, get reminders, and see your progress simply and
          quickly.
        </p>
      </div>
      <div className="flex flex-col gap-4 md:mx-[176.5px]">
        <div className="p-[40px] bg-[#0D0D0D] rounded-[10px] border border-white/20 text-center">
          <div className="bg-white mx-auto flex justify-center items-center size-14 px-[18px] py-[10px] rounded-[10px] mb-6">
            <LeaveIcon />
          </div>
          <div>
            <h5 className="mb-2 text-h5 font-semibold text-white">
              Integration ecosystem
            </h5>
            <p className="text-body-medium">
              Enhance your productivity by connecting with your favorite tools,
              keeping all your essentials in one place.
            </p>
          </div>
        </div>
        <div className="p-[40px] bg-[#0D0D0D] rounded-[10px] border border-white/20 text-center">
          <div className="bg-white mx-auto flex justify-center items-center size-14 px-[18px] py-[10px] rounded-[10px] mb-6">
            <LeaveIcon />
          </div>
          <div>
            <h5 className="mb-2 text-h5 font-semibold text-white">
              Integration ecosystem
            </h5>
            <p className="text-body-medium">
              Enhance your productivity by connecting with your favorite tools,
              keeping all your essentials in one place.
            </p>
          </div>
        </div>
        <div className="p-[40px] bg-[#0D0D0D] rounded-[10px] border border-white/20 text-center">
          <div className="bg-white mx-auto flex justify-center items-center size-14 px-[18px] py-[10px] rounded-[10px] mb-6">
            <LeaveIcon />
          </div>
          <div>
            <h5 className="mb-2 text-h5 font-semibold text-white">
              Integration ecosystem
            </h5>
            <p className="text-body-medium">
              Enhance your productivity by connecting with your favorite tools,
              keeping all your essentials in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;