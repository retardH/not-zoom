"use client";
import { useRouter } from "next/navigation";
import MeetingCard from "./meeting-card";
import { useState } from "react";
import MeetingModal from "@/components/shared/meeting-modal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "react-hot-toast";

type MeetingType =
  | "isInstantMeeting"
  | "isJoiningMeeting"
  | "isScheduleMeeting"
  | undefined;

const MeetingTypesList = () => {
  const router = useRouter();
  const [meetingType, setMeetingType] = useState<MeetingType>();
  const [meetingInfo, setMeetingInfo] = useState({
    dateTime: new Date(),
    desc: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = () => {
    if (!user || !client) return;
    try {
      if (!meetingInfo.dateTime) {
        toast("Plese select datetime for the meeting.");
      }

      const callId = crypto.randomUUID();
      const call = client.call("default", callId);
      if (!call) {
        throw new Error("Failed to create call!");
      }
      const startsAt =
        meetingInfo.dateTime.toISOString() || new Date().toISOString();
      const description = meetingInfo.desc || "Instant meeting";

      call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      toast("Meeting created!");
      if (!meetingInfo.desc) {
        router.push(`/meeting/${call.id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create meeting!");
    }
  };
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MeetingCard
        title="New Meeting"
        desc="Starts an instant meeting"
        iconImgUrl="/icons/add-meeting.svg"
        className="bg-orange-500"
        handleClick={() => setMeetingType("isJoiningMeeting")}
      />
      <MeetingCard
        title="Join Meeting"
        desc="Via invitation link"
        iconImgUrl="/icons/join-meeting.svg"
        className="bg-purple-500"
        handleClick={() => setMeetingType("isInstantMeeting")}
      />
      <MeetingCard
        title="Schedule Meeting"
        desc="Plan your meeting"
        iconImgUrl="/icons/schedule.svg"
        className="bg-amber-500"
        handleClick={() => setMeetingType("isScheduleMeeting")}
      />
      <MeetingCard
        title="View Recordings"
        desc="Meeting recordings"
        iconImgUrl="/icons/video.svg"
        className="bg-blue-500"
        handleClick={() => router.push("/recordings")}
      />
      <MeetingModal
        isOpen={!!meetingType}
        onClose={() => setMeetingType(undefined)}
        title="Start an meeting"
        onOk={createMeeting}
      />
    </section>
  );
};

export default MeetingTypesList;
