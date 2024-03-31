import HomeHeroBanner from "@/components/pages/home/hero-banner";
import MeetingTypesList from "@/components/pages/home/meeting-types-list";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <section className="flex size-full flex-col gap-5">
      <HomeHeroBanner />
      <MeetingTypesList />
    </section>
  );
};

export default HomePage;
