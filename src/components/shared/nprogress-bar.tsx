"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const NProgressBar = () => {
  return (
    <>
      <ProgressBar
        height="2px"
        color="#bbb"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default NProgressBar;
