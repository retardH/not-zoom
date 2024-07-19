"use client";
import MeetingRoom from "@/components/pages/meeting/meeting-room";
import MeetingSetup from "@/components/pages/meeting/meeting-setup";
import Alert from "@/components/shared/alert";
import Loader from "@/components/shared/loader";
import { useGetCallById } from "@/lib/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const MeetingPage: NextPage<{ params: { id: string } }> = ({ params }) => {
  const { user, isLoaded } = useUser();
  const [isSetupCompleted, setIsSetupCompleted] = useState<boolean>(false);
  const { call, isCallLoading } = useGetCallById(params.id);

  if (!isLoaded || isCallLoading) {
    return <Loader />;
  }

  if (!call) {
    return <Alert title="Call not found!" />;
  }

  const notAllowed =
    call?.type === "invited" &&
    (!user || !call.state.members.find((m) => m.user_id === user.id));

  if (!notAllowed) {
    return <Alert title="You are not allowed to join this meeting." />;
  }

  return (
    <main className="min-h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupCompleted ? (
            <MeetingSetup setIsSetUpCompleted={setIsSetupCompleted} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
