import { createServer } from 'http';
import { PORT } from "./.env"

let controllers = [];


function use(method, path, func) {
    let item = {
        path: path,
        function: func,
        method: method
    }
    controllers.push(item);
}

function router(request, response) {
    let url = request.url.split('/');
    let command = url[1];
    let action = url[2];
    let fullPath = command && action ? `${command}/${action}` : command;
    let found = false;

    for (let item of controllers) {
        if (
            (item.path === fullPath && item.method === request.method) ||
            (item.path === command && item.method === request.method)
        ) {
            item.function(request, response);
            found = true;
            break;
        }
    }
    if (found === false) {
        response.write("Command not found.");
        response.end();
    }
}

function start() {
    let myServer = createServer(function(request, response) {
        console.log("request:", request.method, request.url);

        let data = '';
        request.on("data", function(chunk) {
            data += chunk;
        });
        request.on("end", function() {
            try {
                data = JSON.parse(data);
            } catch (e) {
                console.log('WARNING: POST data is not a json.');
            }
            request.data = data;
            router(request, response);
        });
    });
    myServer.listen(PORT, function() {
        console.log("Server started on port:", PORT)
    });

}

function write(res, status, body, cookie) {
    if (cookie) {
        res.writeHead(status, {
            'Set-Cookie': cookie + '; path=/'
        });
    } else {
        res.writeHead(status);
    }
    res.write(body);
    res.end();
}
export {
    use,
    start,
    write
}