import { writeFile, readFile, readFileSync, writeFileSync } from "fs";

export const readFileAndWriteForSignUp = async(filePath, reqData) => {
    try {
        let dataObject = { records: [] };
        try {
            const data = readFileSync(filePath, "utf8");
            dataObject = JSON.parse(data);
        } catch (err) {
            if (err.code === 'ENOENT') {
                writeFileSync(filePath, JSON.stringify(dataObject, null, 2));
            } else {
                throw err;
            }
        }

        if (dataObject.records.some(item => item.user === reqData.user)) {
            return { status: 403, message: "User exists" };
        }

        dataObject.records.push(reqData);
        writeFileSync(filePath, JSON.stringify(dataObject, null, 2));

        return { status: 200, message: "Signup done" };
    } catch (err) {
        console.error("Error in model:", err);
        return { status: 500, message: err.message };
    }
};