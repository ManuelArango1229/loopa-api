"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv-flow/config");
const node_child_process_1 = require("node:child_process");
if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL no está definida");
    process.exit(1);
}
(0, node_child_process_1.execSync)("npx prisma generate", { stdio: "inherit" });
