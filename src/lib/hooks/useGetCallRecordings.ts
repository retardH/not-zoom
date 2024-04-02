import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallRecordings = (calls: Call[], type: string) => {
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      const callsData = await Promise.all(
        calls.map((call) => call.queryRecordings() ?? []),
      );

      const recordingsData = callsData
        .filter((data) => data.recordings.length > 0)
        .flatMap((data) => data.recordings);

      setRecordings(recordingsData);
    };
    fetchRecordings();
  }, [calls, type]);

  return {
    recordings,
  };
};
