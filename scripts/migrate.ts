import "dotenv-flow/config";
import { execSync } from "node:child_process";
console.log("Using DATABASE_URL:", process.env.DATABASE_URL);
execSync("npx prisma migrate dev", { stdio: "inherit" });
