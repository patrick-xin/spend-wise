import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="h-12 w-24 relative">
        <Image
          src="/images/logo.png"
          fill
          alt="logo"
          className="object-cover"
        />
      </div>
    </Link>
  );
}

export default Logo;
