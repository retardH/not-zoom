import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";
import ClerkProvier from "@/providers/clerk-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MOOZ",
  description: "Video conferencing app.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvier>
        <body className={`${inter.className} dark bg-dark-2 antialiased`}>
          {children}
          <Toaster
            toastOptions={{
              style: {
                background: "#1C1F2E",
                color: "white",
              },
            }}
          />
        </body>
      </ClerkProvier>
    </html>
  );
}
