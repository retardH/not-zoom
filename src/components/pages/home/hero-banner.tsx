"use client";
import { useCurrentDate } from "@/lib/hooks";
import dayjs from "dayjs";

const HomeHeroBanner = () => {
  const { currentDate } = useCurrentDate();
  const timeString = dayjs(currentDate).format("HH:mm A");
  const dateString = dayjs(currentDate).format("dddd, DD MMM YYYY");
  return (
    <div className="bg-hero h-[300px] w-full rounded-xl bg-cover bg-no-repeat object-cover">
      <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-12">
        <h2 className="glassmorphism w-fit max-w-[270px] rounded px-4 py-2 text-center text-base font-normal">
          Upcoming meeting at 12:03
        </h2>
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold lg:text-7xl">{timeString}</h2>
          <p className="text-lg font-medium text-sky-100 lg:text-2xl">
            {dateString}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroBanner;
