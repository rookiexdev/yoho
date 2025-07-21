import crypto from "crypto";
import config from "../configs";

const stateSecret = config.stateSecret;

export const generateState = (): string => {
  const raw = crypto.randomBytes(16).toString("hex");
  return crypto.createHmac("sha256", stateSecret!).update(raw).digest("hex");
};

export const verifyState = (received: string): boolean => {
  // In production: store actual state in session or DB, compare here
  return typeof received === "string" && received.length === 64;
};
