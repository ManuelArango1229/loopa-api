import "dotenv-flow/config";
import { execSync } from "node:child_process";
execSync("npx prisma migrate dev", { stdio: "inherit" });
