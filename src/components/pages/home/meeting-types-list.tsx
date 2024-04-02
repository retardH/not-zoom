"use client";
import { useRouter } from "next/navigation";
import MeetingCard from "./meeting-type-card";
import { useState } from "react";
import MeetingModal from "@/components/shared/meeting-modal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";

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
        router.push(`/meeting/${call.id}?personal=true`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create meeting!");
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MeetingCard
        title="New Meeting"
        desc="Starts an instant meeting"
        iconImgUrl="/icons/add-meeting.svg"
        className="bg-orange-500"
        handleClick={() => setMeetingType("isInstantMeeting")}
      />
      <MeetingCard
        title="Join Meeting"
        desc="Via invitation link"
        iconImgUrl="/icons/join-meeting.svg"
        className="bg-purple-500"
        handleClick={() => setMeetingType("isJoiningMeeting")}
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

      {/* Modals for the meeting cards */}

      {/* Schedule Meeting Modal */}
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingType === "isScheduleMeeting"}
          onClose={() => setMeetingType(undefined)}
          title="Create meeting"
          onOk={createMeeting}
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="meeting-desc"
              className="font-normal leading-relaxed text-sky-100"
            >
              Add a description
            </label>
            <Textarea
              id="meeting-desc"
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setMeetingInfo((values) => ({
                  ...values,
                  desc: e.target.value,
                }));
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="meeting-date"
              className="font-normal leading-relaxed text-sky-100"
            >
              Select date & time
            </label>
            <div className="flex w-full items-center">
              <ReactDatePicker
                selected={meetingInfo.dateTime}
                onChange={(date) =>
                  setMeetingInfo({ ...meetingInfo, dateTime: date as Date })
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-dark-3 p-2 text-sm focus:outline-none"
                wrapperClassName="w-full"
              />
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingType === "isScheduleMeeting"}
          onClose={() => {
            setMeetingType(undefined);
            setCallDetails(undefined);
          }}
          title="Meeting created!"
          onOk={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link copied");
          }}
          imageUrl="/icons/checked.svg"
          buttonIconUrl="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        ></MeetingModal>
      )}

      {/* Join Meeting Link Modal */}
      <MeetingModal
        isOpen={meetingType === "isJoiningMeeting"}
        onClose={() => setMeetingType(undefined)}
        title="Start an meeting"
        onOk={createMeeting}
      />

      {/* Instant Meeting Modal */}
      <MeetingModal
        isOpen={meetingType === "isInstantMeeting"}
        onClose={() => setMeetingType(undefined)}
        title="Start an instant meeting"
        buttonText="Start meeting"
        onOk={createMeeting}
      />
    </section>
  );
};

export default MeetingTypesList;
