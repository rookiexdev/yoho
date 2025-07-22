import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

const arg = process.argv.slice(2);
const args = arg.reduce((acc: { [key: string]: string }, curr: string) => {
  const [key, value] = curr.split("=");
  acc[key] = value;
  return acc;
}, {});

const logFormat = args.logFormat || "simple";
const logLevel = args.logLevel || "info";

const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const filterOnly = (level: string) =>
  format((info) => (info.level === level ? info : false))();

const config = {
  json: format.json(),
  simple: format.simple(),
  pretty: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
} as { [key: string]: any };

export const logger = createLogger({
  level: logLevel,
  format: config[logFormat] || config.simple,
  transports: [
    new transports.File({
      filename: path.join(logDir, "error.log"),
      format: format.combine(filterOnly("error")),
    }),
    new transports.File({
      filename: path.join(logDir, "info.log"),
      format: format.combine(filterOnly("info")),
    }),
    new transports.File({
      filename: path.join(logDir, "debug.log"),
      format: format.combine(filterOnly("debug")),
    }),
  ],
});
