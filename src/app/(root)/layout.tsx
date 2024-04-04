import NProgressBar from "@/components/shared/nprogress-bar";
import StreamClientProvider from "@/providers/stream-client-provider";
import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <StreamClientProvider>
      {children}
      <NProgressBar />
    </StreamClientProvider>
  );
};

export default RootLayout;
