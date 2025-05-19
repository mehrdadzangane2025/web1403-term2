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




function use(name, func) {
    let item = {
        command: name,
        function: func
    }

    controllers.push(item)
}


function start(req, res) {
    let url = req.url.split('/')
    const command = url[1]
    for (const controller of controllers) {
        if (controller.command == command) {
            controller.function(req, res)
        }
    }
}


use('sum', (req, res) => {
    let url = req.url.split('/')
    let numbers = url.slice(2)
    let result = 0;

    if (req.method == 'GET') {
        result = (+(numbers[0]) + +(numbers[1])).toString()
        res.write(result)
        res.end()
    } else if (req.method == 'POST') {
        let numbers = JSON.parse(req.data)
        let result = numbers.num1 + numbers.num2
        res.write(JSON.stringify(result))
        res.end()
    }
})

use('log', (req, res) => {
    res.write(req.data)
    console.log(JSON.parse(req.data).name)
    res.end()
})



server.listen(3000, () => {
    console.log("Server is running on 3000 port")
})


module.exports = {
    start,
    use
}