import crypto from "crypto";
import config from "../configs";

const stateSecret = config.stateSecret;

export const generateState = (name: string | undefined, email: string): string => {
  return encodeURIComponent(JSON.stringify({ email, name }));
};

export const verifyState = (received: string): boolean => {
  return true;
  const [name, email] = JSON.parse(decodeURIComponent(received));
  return typeof name === "string" && typeof email === "string";
};
