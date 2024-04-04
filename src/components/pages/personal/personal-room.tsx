"use client";

import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/lib/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PersonalRoom = () => {
  const router = useRouter();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId as string);

  const startRoomCall = async () => {
    if (!client || !user) return;
    const newCall = client?.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}/?personal=true`);
  };

  const meetingInviteLink = `${location.origin}/meeting/${meetingId}/?personal=true`;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center">
        <p className="min-w-[140px] text-base text-gray-300 lg:text-lg">
          Topic:
        </p>
        <p className="text-base font-semibold lg:text-lg">{`${user?.username}'s Personal Meeting Room`}</p>
      </div>
      <div className="flex items-center text-base lg:text-lg">
        <p className="min-w-[140px] text-base text-gray-300 lg:text-lg">
          Meeting ID:
        </p>
        <p className="font-semibold">{user?.id}</p>
      </div>
      <div className="flex items-center">
        <p className="min-w-[140px] text-base text-gray-300 lg:text-lg">
          Invitation Link:
        </p>
        <p className="cursor-pointer text-base font-semibold text-sky-500 underline lg:text-lg">
          {meetingInviteLink}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-5">
        <Button variant="blue" size="lg" onClick={startRoomCall}>
          Start Meeting
        </Button>
        <Button
          size="lg"
          onClick={() => {
            navigator.clipboard.writeText(meetingInviteLink);
            toast.success("Link Copied");
          }}
        >
          Copy Link
        </Button>
      </div>
    </div>
  );
};

export default PersonalRoom;
