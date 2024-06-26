import CallsList from "@/components/shared/calls-list";
import { NextPage } from "next";

const UpcomingMeetingsPage: NextPage = () => {
  return (
    <section className="flex size-full flex-col gap-5 lg:gap-10">
      <h1 className="text-2xl font-bold lg:text-3xl">Upcoming Meetings</h1>
      <CallsList type="upcoming" />
    </section>
  );
};

export default UpcomingMeetingsPage;
