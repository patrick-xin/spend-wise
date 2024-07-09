import Link from "next/link";

function Tag() {
  return (
    <div className="px-[13px] mx-auto w-fit py-[10px] rounded-[10px] border dark:border-[#222222]">
      <p className="text-black text-xs dark:text-white/50">
        Version 2.0 is here{" "}
        <span>
          <a className="text-white ml-2">Read more</a>
        </span>
      </p>
      {/* <Link href="/" className="">read more</Link> */}
    </div>
  );
}

export default Tag;
