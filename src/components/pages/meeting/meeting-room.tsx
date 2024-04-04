import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "@/components/shared/end-call-button";
import Loader from "@/components/shared/loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";
const callLayoutTypes: CallLayoutType[] = [
  "grid",
  "speaker-left",
  "speaker-right",
];

const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("grid");
  const [showParticipants, setShowParticipants] = useState<boolean>(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const getCallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout />;
    }
  };

  if (callingState !== CallingState.JOINED) {
    return <Loader />;
  }

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          {getCallLayout()}
        </div>
        <div
          className={cn(
            "ml-2 hidden h-[calc(100vh-86px)]",
            showParticipants && "show-block",
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full flex-wrap items-center justify-center gap-5">
        <CallControls onLeave={() => router.push("/")} />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-full bg-[#19232d] p-2 hover:bg-[#4c535b]">
              <LayoutList size={20} />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1">
            {callLayoutTypes.map((type) => {
              return (
                <DropdownMenuItem
                  key={type}
                  onClick={() => {
                    setLayout(type);
                  }}
                  className="cursor-pointer capitalize"
                >
                  {type.split("-").join(" ")}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          onClick={() => {
            setShowParticipants((prev) => !prev);
          }}
        >
          <div className="cursor-pointer rounded-full bg-[#19232d] p-2 hover:bg-[#4c535b]">
            <Users size={20} />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
