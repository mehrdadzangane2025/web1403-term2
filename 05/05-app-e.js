const { use, start } = require("./05-httpframwork-e")

use("GET", 'sum', (req, res) => {
    let url = req.url.split('/')
    let numbers = url.slice(2)
    let result = 0;


    result = (+(numbers[0]) + +(numbers[1])).toString()
    res.write(result)
    res.end()

})

use("POST", 'sum', (req, res) => {
    let numbers = JSON.parse(req.data)
    let result = numbers.num1 + numbers.num2
    res.write(JSON.stringify(result))
    console.log(result)
    res.end()

})


use("GET", 'log', (req, res) => {
    let data = JSON.parse(req.data)
    console.log(data)
    res.end()
})

start()