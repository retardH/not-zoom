import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const EndCallButton = () => {
  const router = useRouter();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) {
    return null;
  }
  return (
    <Button
      onClick={async () => {
        await call.endCall();
        router.push("/");
      }}
      variant="destructive"
      className="bg-red-500 hover:bg-red-400"
    >
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
