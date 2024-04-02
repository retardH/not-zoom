import { useUser } from "@clerk/nextjs";
import {
  Call,
  CallRecordingListHeader,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isCallsLoading, setIsCallLoading] = useState<boolean>(false);
  const client = useStreamVideoClient();
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !userId) return;
      setIsCallLoading(true);
      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: userId },
              { members: { $in: [userId] } },
            ],
          },
        });
        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsCallLoading(false);
      }
    };

    loadCalls();
  }, [client, userId]);

  const now = new Date(Date.now());
  const endedCalls = calls.filter((call) => {
    const callState = call.state;
    return (
      (callState.startsAt && new Date(callState.startsAt) < now) ||
      !!callState.endedAt
    );
  });

  const upcomingCalls = calls.filter((call) => {
    const callState = call.state;
    return callState.startsAt && new Date(callState.startsAt) > now;
  });

  return {
    isCallsLoading,
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
  };
};
