import app from "./app";
import { prisma } from "./connections";
import config from "./configs";

async function main() {
  try {
    try {
      await prisma.$connect();
      console.log("Connected to database");
      app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  } catch (error) {
    console.log(error);
  }
}

main();
