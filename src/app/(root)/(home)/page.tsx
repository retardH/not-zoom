import HomeHeroBanner from "@/components/pages/home/hero-banner";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <section className="flex size-full flex-col">
      <HomeHeroBanner />
    </section>
  );
};

export default HomePage;
