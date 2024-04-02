import { cn } from "@/lib/utils";
import Image from "next/image";

interface MeetingCardProps {
  title: string;
  desc: string;
  iconImgUrl: string;
  className: string;
  handleClick: () => void;
}

const MeetingCard = ({
  title,
  desc,
  iconImgUrl,
  className,
  handleClick,
}: MeetingCardProps) => {
  return (
    <div
      className={cn(
        "flex min-h-[260px] w-full cursor-pointer flex-col justify-between rounded-lg px-4 py-5 xl:max-w-[270px]",
        className,
      )}
      onClick={handleClick}
    >
      <div className="glassmorphism flex size-12 items-center justify-center rounded-md">
        <Image src={iconImgUrl} alt="add meeting" width={26} height={26} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-lg font-medium">{desc}</p>
      </div>
    </div>
  );
};

export default MeetingCard;
