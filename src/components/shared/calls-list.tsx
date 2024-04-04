"use client";
import { useGetCalls } from "@/lib/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import MeetingCard from "./meeting-card";
import toast from "react-hot-toast";
import { useGetCallRecordings } from "@/lib/hooks/useGetCallRecordings";

interface CallsListProps {
  type: "ended" | "upcoming" | "recordings";
}

const CallsList = ({ type }: CallsListProps) => {
  const { upcomingCalls, endedCalls, isCallsLoading, callRecordings } =
    useGetCalls();
  const { recordings } = useGetCallRecordings(callRecordings, type);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };

  const getNoCallMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Call Recordings";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallMessage = getNoCallMessage();

  if (isCallsLoading) {
    return <h4>Loading...</h4>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {!!calls && calls.length > 0 ? (
        calls.map((call: Call | CallRecording) => {
          return (
            <MeetingCard
              key={(call as Call).id}
              title={
                (call as Call).state?.custom?.description ||
                (call as CallRecording).filename?.substring(0, 20) ||
                "No Description"
              }
              date={
                (call as Call).state?.startsAt?.toLocaleTimeString([], {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }) || (call as CallRecording).start_time?.toLocaleString()
              }
              cardIconUrl={
                type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : type === "ended"
                    ? "/icons/previous.svg"
                    : "/icons/recordings.svg"
              }
              showAvatars={type !== "recordings"}
              showButtons={type !== "ended"}
              firstBtnText={type === "upcoming" ? "Start" : "Play"}
              secondBtnOnClick={() => {
                navigator.clipboard.writeText("");
                toast.success("Link copied");
              }}
            />
          );
        })
      ) : (
        <h4 className="text-lg font-medium xl:text-2xl">{noCallMessage}</h4>
      )}
    </div>
  );
};

export default CallsList;
