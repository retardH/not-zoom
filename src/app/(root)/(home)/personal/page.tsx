import PersonalRoom from "@/components/pages/personal/personal-room";
import { NextPage } from "next";

const PersonalRoomPage: NextPage = () => {
  return (
    <section className="flex size-full flex-col gap-5 lg:gap-10">
      <h1 className="text-2xl font-bold lg:text-3xl">Personal Room</h1>
      <PersonalRoom />
    </section>
  );
};

export default PersonalRoomPage;
