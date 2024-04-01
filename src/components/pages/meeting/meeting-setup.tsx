"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

interface MeetingSetupProps {
  setIsSetUpCompleted: (isComplete: boolean) => void;
}
const MeetingSetup = ({ setIsSetUpCompleted }: MeetingSetupProps) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState<boolean>(false);
  const call = useCall();

  useEffect(() => {
    if (!call) return;
    if (isMicCamToggledOn) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="mt-2 flex h-16 flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2 font-medium">
          <div className="flex items-center justify-center gap-2">
            <Checkbox
              id="mic-cam-on"
              checked={isMicCamToggledOn}
              onCheckedChange={(c) => setIsMicCamToggledOn(!!c)}
            />
            <label htmlFor="mic-cam-on">
              Join meeting with mic and cam off
            </label>
          </div>
          <DeviceSettings />
        </div>
        <Button
          variant="success"
          className="px-8 py-4"
          onClick={() => {
            call?.join();
            setIsSetUpCompleted(true);
          }}
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
