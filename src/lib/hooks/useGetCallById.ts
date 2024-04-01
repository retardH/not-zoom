import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (callId: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState<boolean>(true);

  const client = useStreamVideoClient();
  useEffect(() => {
    if (!client) return;
    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id: callId,
        },
      });
      setIsCallLoading(false);
      if (calls.length > 0) {
        setCall(calls[0]);
      }
    };

    loadCall();
  }, [client, callId]);

  return {
    call,
    isCallLoading,
  };
};
