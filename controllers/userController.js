import { writeFile, readFile, readFileSync } from "fs";
import { use, start, write } from "./httpFrameWork.js";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);
import * as app from './app.js';