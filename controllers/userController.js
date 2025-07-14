import { writeFile, readFile, readFileSync } from "fs";
import { join, dirname, extname } from "path";
import { readFileAndWriteForSignUp } from "./../models/User.js";
import { fileURLToPath } from "url";
import { use, start, write } from "./../httpFrameWork.js";

import jwt from "jsonwebtoken";
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);




export async function getFilePath(req, res) {
    try {
        const filePath = join(__dirname, '..', 'data', 'users.json');
        const result = await readFileAndWriteForSignUp(filePath, req.data);

        if (result.status === 403) {
            write(res, 403, JSON.stringify({
                error: true,
                message: "this user already exist!!",
                type: "duplicate_user"
            }));
        } else if (result.status === 200) {
            write(res, 200, JSON.stringify({
                success: true,
                message: "ثبت نام موفقیت آمیز بود"
            }));
        } else {
            write(res, result.status, JSON.stringify({
                error: true,
                message: result.message
            }));
        }
    } catch (error) {
        console.error("Error in getFilePath:", error);
        write(res, 500, JSON.stringify({
            error: true,
            message: "problem in server",
            type: "server_error"
        }));
    }
}