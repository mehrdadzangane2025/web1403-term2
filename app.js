import { writeFile, readFile, readFileSync } from "fs";
import { use, start, write } from "./httpFrameWork.js";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);
import { TOKEN_TIME, JWT_SECRET } from "./.env"


//d

/*asda*/

//


function isValidUser(userPayload) {
    const filePath = join(__dirname, "data", "users.json");

    let data = readFileSync(filePath);
    let dataObject = JSON.parse(data);
    let found = false;
    for (let item of dataObject.records) {

        if (item.user === userPayload.toString()) {
            return found = true;
        }
    }

    if (found) {
        return true;
    } else {
        return false;
    }


}


function generateId() {
    let randomNumber = Math.floor(Math.random() * 100000000);
    let Id = String(randomNumber).padStart(8, "0");
    return Id;
}

function verifyToken(token) {
    try {
        let decoded = jwt.verify(token, JWT_SECRET);

        if (
            Date.now() / 1000 - decoded.iat < TOKEN_TIME &&
            isValidUser(decoded.user)
        ) {
            console.log(decoded.user);
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

function parseCookie(cookieString, key) {
    let cookies = "";
    try {
        cookies = cookieString.split(";");
    } catch (e) {
        return "";
    }
    for (let cookie of cookies) {
        let splitted = cookie.split("=");
        if (splitted[0] === key) {
            return splitted[1];
        }
    }
}


// GET * page

use("GET", "page", function(req, res) {
    let url = req.url.split("/");
    let inputs = url.slice(2);
    console.log();
    console.log();
    console.log();
    console.log("Requested file:", inputs[0]);
    let filePath = join(__dirname, "views", inputs[0]);
    if (!inputs[0]) {

        filePath = join(__dirname, "views", 'login.html');

    }
    let extName = extname(filePath);
    let contentType = "text/html";

    if (contentType === "text/html" && extName === "") {
        filePath += ".html";
        extName = " .html";
    }
    console.log("extName is :" + extName);
    console.log();
    console.log();
    console.log();

    switch (extName) {
        case ".js":
            contentType = "text/javascript";
            break;

        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = " image/jpg";
            break;
    }

    readFile(filePath, (err, data) => {
        if (err) {
            if (err.code == "ENOENT") {
                // ENOENT mean 404 or page not found!
                readFile(join(__dirname, "views", "404.html"), (err, data) => {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end(data, "utf8");
                });
            } else {
                write(res, 200, data);
                res.end(`Server err: ${err.code}`);
            }
        } else {
            // status code is 200!
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data, "utf8");
        }
    });
});

// POST * Signup

use("POST", "api/signup", function(req, res) {
    const filePath = join(__dirname, "data", "users.json");

    readFile(filePath, "utf8", function(err, data) {
        if (err) {
            console.log("err:", err);
            write(res, 500, "err:" + err);
        } else {
            let dataObject = JSON.parse(data);
            for (let item of dataObject.records) {
                if (item.user === req.data.user) {
                    write(res, 403, JSON.stringify("User exists"));
                    return;
                }
            }

            dataObject.records.push(req.data);
            const dataString = JSON.stringify(dataObject, null, 2);

            writeFile(filePath, dataString, function(err) {
                if (err) {
                    console.log("err:", err);
                    write(res, 500, "err:" + err);
                } else {
                    console.log("Signup done");
                    write(res, 200, JSON.stringify("Signup done"));
                }
            });
        }
    });
});

// POST * login

use("POST", "api/login", function(req, res) {
    const filePath = join(__dirname, "data", "users.json");

    readFile(filePath, "utf8", function(err, data) {
        if (err) {
            console.log("ERROR:", err);
            write(res, 500, "ERROR:" + err);
        } else {
            let dataObject = JSON.parse(data);
            let foundIndex = -1;

            for (let i = 0; i < dataObject.records.length; i++) {
                if (
                    dataObject.records[i].user === req.data.user &&
                    dataObject.records[i].pass === req.data.pass
                ) {
                    foundIndex = i;
                }
            }

            if (foundIndex >= 0) {
                let signedToken = jwt.sign(dataObject.records[foundIndex],
                    JWT_SECRET);
                console.log(signedToken);
                console.log("Token --/--");


                console.log("\n--- New Token Generated ---");
                console.log("For User:", dataObject.records[foundIndex].user);
                console.log("Token:", signedToken);
                console.log("Expires In:", TOKEN_TIME, "seconds");
                console.log("--------------------------\n");

                let cookie = ["token=" + signedToken +
                    "; Max-Age=" + TOKEN_TIME
                ];

                write(res, 200, JSON.stringify("Login done"), cookie);
            } else {
                write(res, 401, JSON.stringify("User not found"));
            }
        }
    });
});
use('GET', 'api/article', function(req, res) {
    const filePath = join(__dirname, "data", "data.json");

    if (!verifyToken(parseCookie(req.headers.cookie, 'token'))) {
        write(res, 401, 'Not Logged In...');
    } else {
        readFile(filePath, 'utf-8', function(err, data) {
            if (err) {
                write(res, 400, 'Error: ' + err);
            } else {
                write(res, 200, data);
            }
        })
    }
});


// POST * article
use("POST", "api/article", function(req, res) {
    const filePath = join(__dirname, "data", "data.json");

    readFile(filePath, "utf8", function(error, fileData) {
        if (error) {
            console.log("ERROR:", error);
            write(res, 500, "ERROR:" + error);
        } else {
            let dataObject = JSON.parse(fileData);
            let articleData = {
                id: generateId(),
                title: req.data.title,
                body: req.data.body,
            };
            dataObject.records.push(articleData);
            let dataString = JSON.stringify(dataObject, null, 2);

            writeFile(filePath, dataString, function(error) {
                if (error) {
                    console.log("ERROR:", error);
                    write(res, 500, "ERROR:" + error);
                } else {
                    console.log("Article created");
                    write(res, 200, JSON.stringify("Article created"));
                }
            });
        }
    });
});

// api article


use('DELETE', 'api/article', function(req, res) {
    let url = req.url.split('/');
    let inputs = url.slice(3);
    console.log(inputs);
    console.log(url);

    const filePath = join(__dirname, "data", "data.json");

    if (!verifyToken(parseCookie(req.headers.cookie, 'token'))) {
        write(res, 401, 'Not Logged in...');
    } else {
        readFile(filePath, function(error, fileData) {
            if (error) {
                write(res, 400, 'Error: ' + error);
            } else {
                let data = JSON.parse(fileData);
                let found = -1;

                for (let i = 0; i < data.records.length; i++) {
                    if (data.records[i].id === inputs[0]) {
                        found = i;
                        break;
                    }
                }
                if (found === -1) {
                    write(res, 404, 'Article not Found...');
                } else {
                    data.records.splice(found, 1);
                    writeFile(filePath, JSON.stringify(data, null, 2), function(error, data) {
                        if (error) {
                            write(res, 400, 'Error: ' + error);
                        } else {
                            write(res, 200, 'Article Deleted...');
                        }
                    })
                }
            }
        })
    }
});

use('GET', 'api/article', function(req, res) {
    const filePath = join(__dirname, "data", "data.json");

    if (!verifyToken(parseCookie(req.headers.cookie, 'token'))) {
        write(res, 401, 'Not Logged In...');
    } else {
        readFile(filePath, 'utf-8', function(error, fileData) {
            if (error) {
                write(res, 400, 'Error: ' + error);
            } else {
                write(res, 200, fileData);
            }
        })
    }
});

start();