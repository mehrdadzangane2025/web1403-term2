import { createServer } from "http";
const server = creatServer((req, res) => {

    let body = ""
    req.on("data", (chunck) => {

        body += chunck.toString();
    })

    req.on("end", () => {

            try {

                body = JSON.parse(body);
            } catch (e) {
                console.error("JSON parsing error", e.message);
                res.statusCode = 400
                res.end("Invalid JSON");
                return;

            }

            ReadableStreamDefaultController(req, res, body);
        })
        // let url = req.url.split('/');
        // let command = url[1];
        // let input = url.slice(2);

    // console.log(req.url);
    // console.log(req.methode);

    // if (command === 'sum') {
    //     res.write(parseInt((+input[0]) + parseInt(+input[1])).toString())
    //     res.end();
    // } else {
    //     res.write('command not found!')
    //     res.end();
    // }
})

function router(req, res, data) {
    let url = req.url.split("/");
    let command = url[1];
    let input = url.slice(2);

    if (req.method === "POST" && command === "sum") {
        let sum = parseInt(+data.input1 + parseInt(+data.input2)).toString()
        res.write(sum);
        res.end();
    } else if (req.method === "GET" && command === "sum") {
        res.write(parseInt(+data.input1 + parseInt(+data.input2)).toString());
        res.end();
    } else {
        res.write("command not found")
        res.end();
    }
}
server.listen(80, () => {
    console.log("listening on port 80");

});