import { useEffect, useState } from "react";

export const useCurrentDate = () => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1500);

    return () => {
      clearInterval(timer);
    };
  });

  return {
    currentDate: now,
  };
};
