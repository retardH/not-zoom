"use client";
import { sidebarItems } from "@/lib/constant-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="bg-dark-1 sticky left-0 top-0 flex h-screen w-fit flex-col justify-between p-6 pt-28 max-sm:hidden lg:w-[264px]">
      <div className="flex flex-col gap-2">
        {sidebarItems.map((item) => {
          const isActivePath =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              key={item.route}
              href={item.route}
              className={cn(
                "flex items-center justify-start gap-4 rounded-lg p-4",
                isActivePath && "bg-blue-600 font-semibold",
              )}
            >
              <Image
                src={item.imgUrl}
                alt={item.label}
                width={24}
                height={24}
              />
              <p className="text-base font-medium max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
