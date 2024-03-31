import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobile-navbar";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          alt="LOGO"
          width={36}
          height={36}
          className="max-sm:size-10"
        />
        <h4 className="text-xl font-bold max-md:hidden">MOOZ</h4>
      </Link>
      <div className="flex items-center gap-5">
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: 40,
                  height: 40,
                },
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <Button>Login</Button>
        </SignedOut>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
