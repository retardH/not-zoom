import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobile-navbar";

const Navbar = () => {
  return (
    <nav className="bg-dark-1 fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          alt="LOGO"
          width={36}
          height={36}
          className="max-sm:size-10"
        />
        <h4 className="rotate-180 text-xl font-bold">ZOOM</h4>
      </Link>
      <div className="flex items-center gap-5">
        {/* clerk user icon here */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
