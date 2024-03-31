import StreamClientProvider from "@/providers/stream-client-provider";
import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return <StreamClientProvider>{children}</StreamClientProvider>;
};

export default RootLayout;
