import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOk?: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  buttonText?: string;
  buttonIconUrl?: string;
  imageUrl?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  onOk,
  title,
  className,
  children,
  buttonIconUrl,
  buttonText,
  imageUrl,
}: MeetingModalProps) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>Open</DialogTrigger>
        <DialogContent className="flex w-11/12 max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-10">
          <div className="flex flex-col gap-6">
            {imageUrl && (
              <div className="flex justify-center">
                <Image src={imageUrl} alt="Image" width={70} height={70} />
              </div>
            )}
            <h1
              className={cn(
                "text-lg font-bold leading-relaxed lg:text-2xl",
                className,
              )}
            >
              {title}
            </h1>
            {children}
            <Button
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              onClick={onOk}
            >
              {buttonIconUrl && (
                <Image
                  src={buttonIconUrl}
                  alt="button icon"
                  width={12}
                  height={12}
                />
              )}
              &nbsp;
              {buttonText || "Schedule Meeting"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetingModal;
