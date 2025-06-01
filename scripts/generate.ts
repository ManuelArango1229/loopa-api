import "dotenv-flow/config";
import { execSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
	console.error("❌ DATABASE_URL no está definida");
	process.exit(1);
}

execSync("npx prisma generate", { stdio: "inherit" });
