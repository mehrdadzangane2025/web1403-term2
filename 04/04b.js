import { createServer } from "http";
const server = creatServer((req, res) => {

    let url = req.url.split('/');
    let command = url[1];
    let input = url.slice(2);

    console.log(req.url);
    console.log(req.methode);

    if (command === 'sum') {
        res.write(parseInt((+input[0]) + parseInt(+input[1])).toString())
        res.end();
    } else {
        res.write('command not found!')
        res.end();
    }
})
server.listen(80);