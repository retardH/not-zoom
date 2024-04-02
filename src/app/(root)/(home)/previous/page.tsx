import CallsList from "@/components/shared/calls-list";

const PreviousMeetingsPage = () => {
  return (
    <section className="flex size-full flex-col gap-10">
      <h1 className="text-xl font-bold lg:text-3xl">Upcoming Meetings</h1>
      <CallsList type="ended" />
    </section>
  );
};

export default PreviousMeetingsPage;
