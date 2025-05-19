const http = require('http')
let controllers = []


const server = http.createServer((req, res) => {
    let data = ''
    req.on("data", (chunk) => {
        data += chunk.toString()
    })

    req.on('end', () => {
        req.data = data
        start(req, res)
    })
})




function use(method, name, func) {
    let item = {
        command: name,
        function: func,
        method: method
    }

    controllers.push(item)
}


function start(req, res) {
    let url = req.url.split('/')
    const command = url[1]
    let found = false
    for (const controller of controllers) {
        if (controller.command == command && controller.method === req.method) {
            controller.function(req, res)
            found = true
            break
        }
    }

    if (!found) {
        res.write({
            message: "Not Found !!"
        })

        res.end()
    }
}




server.listen(3000, () => {
    console.log("Server is running on 3000 port")
})


module.exports = {
    use
}