"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User does not exist, please login!");
  }
  if (!apiKey) {
    throw new Error("No api key!");
  }
  if (!apiSecret) {
    throw new Error("No api secret key!");
  }
  const streamClient = new StreamClient(apiKey, apiSecret, {
    timeout: 5000,
  });

  // exp is optional (by default the token is valid for an hour)
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.createToken(user.id, exp, issuedAt);
  return token;
};
