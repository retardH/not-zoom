import { NextPage } from "next";

const MeetingPage: NextPage<{ params: { id: string } }> = ({ params }) => {
  return <div>MeetingPage {params.id}</div>;
};

export default MeetingPage;
