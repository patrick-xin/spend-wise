import Navbar from "@/components/navbar";
import { Suspense } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-full flex flex-col mb-20">
      <Suspense>
        <Navbar />
      </Suspense>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
