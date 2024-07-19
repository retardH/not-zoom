import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface AlertProps {
  iconUrl?: string;
  title: string;
}
const Alert = ({ iconUrl, title }: AlertProps) => {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex min-w-[280px] max-w-[500px] flex-col gap-6 rounded-md bg-dark-1 p-6">
        <div className="flex flex-col gap-4 text-center">
          {iconUrl && (
            <Image src={iconUrl} alt="alert icon" width={40} height={40} />
          )}
          <h4 className="text-lg font-semibold">{title}</h4>
        </div>
        <Button asChild variant="blue">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
};

export default Alert;
