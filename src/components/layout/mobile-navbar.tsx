"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarItems } from "@/lib/constant-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <aside className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger icon"
            width={36}
            height={36}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              alt="LOGO"
              width={36}
              height={36}
              className="max-sm:size-10"
            />
            <h4 className="rotate-180 text-xl font-bold">MOOZ</h4>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-2 pt-4">
                {sidebarItems.map((item) => {
                  const isActivePath = pathname === item.route;
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        className={cn(
                          "flex w-full items-center gap-4 rounded-lg p-4",
                          isActivePath && "bg-blue-600 font-semibold",
                        )}
                      >
                        <Image
                          src={item.imgUrl}
                          alt={item.label}
                          width={20}
                          height={20}
                        />
                        <p className="text-sm font-medium">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  );
};

export default MobileNav;
