import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import { dark } from "@clerk/themes";

const ClerkProvier = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/yoom-logo.svg",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A41",
            colorInputText: "#fff",
          },
          baseTheme: dark,
        }}
      >
        {children}
      </ClerkProvider>
    </>
  );
};

export default ClerkProvier;
