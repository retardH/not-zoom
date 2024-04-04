import Image from "next/image";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { avatarImages } from "@/lib/constant-data";

interface MeetingCardProps {
  title: string;
  date: string;
  cardIconUrl: string;
  showButtons?: boolean;
  showAvatars?: boolean;
  firstBtnText?: string;
  firstBtnOnClick?: () => void;
  secondBtnOnClick?: () => void;
}
const MeetingCard = ({
  title,
  date,
  cardIconUrl,
  showAvatars,
  showButtons,
  firstBtnText,
  firstBtnOnClick,
  secondBtnOnClick,
}: MeetingCardProps) => {
  return (
    <div className="flex cursor-pointer flex-col gap-2 rounded-md bg-dark-3 p-4 transition-all hover:bg-dark-3/90 md:p-5">
      <Image src={cardIconUrl} width={24} height={24} alt="card icon" />
      <h4 className="text-lg font-semibold md:text-xl xl:text-2xl">{title}</h4>
      <p className="text-sm font-normal text-sky-100 lg:text-base">{date}</p>
      <div className="flex flex-col items-start justify-between gap-3 pt-4 md:flex-row md:items-center">
        {!!showAvatars && (
          <div className="relative flex flex-1 items-center">
            {avatarImages.map((img) => {
              return (
                <Image
                  key={img}
                  src={img}
                  alt="avatar image"
                  width={36}
                  height={36}
                  className="relative -ml-2 rounded-full border-2 border-dark-2 first-of-type:ml-0"
                />
              );
            })}
          </div>
        )}
        {!!showButtons && (
          <div className="flex w-full flex-1 items-center gap-1.5 md:w-auto">
            <Button variant="blue" className="flex-1" onClick={firstBtnOnClick}>
              {firstBtnText || "Start"}
            </Button>
            <Button
              variant="blue"
              className="flex flex-1 items-center gap-1 bg-dark-4 hover:bg-dark-4/90"
              onClick={secondBtnOnClick}
            >
              <Image
                src="/icons/copy.svg"
                alt="copy icon"
                width={20}
                height={20}
              />
              Copy Link
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingCard;
