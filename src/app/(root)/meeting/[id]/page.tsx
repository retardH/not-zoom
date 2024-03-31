"use client";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { NextPage } from "next";
import { useState } from "react";

const MeetingPage: NextPage<{ params: { id: string } }> = ({ params }) => {
  const { user, isLoaded } = useUser();
  const [isSetupCompleted, setIsSetupCompleted] = useState<boolean>(false);
  return (
    <main className="min-h-screen w-full">
      <StreamCall>
        <StreamTheme>
          {!isSetupCompleted ? "meeting setup" : "meeting room"}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
