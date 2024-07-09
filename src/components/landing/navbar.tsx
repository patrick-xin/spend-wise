import Logo from "../logo";
import MenuIcon from "../svgs/menu";
import { Button } from "../ui/button";

function Navbar() {
  return (
    <>
      {/* <DesktopNavbar /> */}
      <MobileNavbar />
    </>
  );
}

export default Navbar;

const DesktopNavbar = () => {
  return (
    <header>
      <nav className="p-5">
        <Logo />
      </nav>
    </header>
  );
};

const MobileNavbar = () => {
  return (
    <header className="h-[81px] p-5">
      <nav className="flex justify-between items-center">
        <Logo />
        <div className="hidden md:block">
          <Button>Get started</Button>
        </div>
        <div className="md:hidden">
          <MenuIcon />
        </div>
      </nav>
    </header>
  );
};
