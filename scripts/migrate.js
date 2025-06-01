"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv-flow/config");
const node_child_process_1 = require("node:child_process");
(0, node_child_process_1.execSync)("npx prisma migrate dev", { stdio: "inherit" });
