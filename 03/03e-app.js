import { start, use } from "./03e-cmdFramework.js";
import { writeFile, readFile } from "fs";

use("sum", function sum(input) {
    console.log(Number(input[0]) + Number(input[1]));
})
use("minus", function minus(input) {
    console.log(Number(input[0]) - Number(input[1]));
})
use("print", function print(input) {
    let obj = {
        name: input[0],
        family: input[1],
        email: input[2]
    }

    for (key in obj) {
        console.log(`value is ${obj[key]}`);
    }
})
use("write", function write(input) {
    let person = {
        name: input[0],
        family: input[1],
        email: input[2]
    }

    writeFile('./data.txt', JSON.stringify(person), function(error, data) {
        if (error) {
            console.log('ERROR:', error);
        }

        console.log('SUCCESS');
    })
})
use("create", function create(input) {
    readFile('./file.json', (err, data) => {
        if (err) {
            console.log('ERROR:', err);
        }
        let person = {
            name: input[0],
            family: input[1],
            email: input[2]
        }

        let objValue = JSON.parse(data);
        objValue.data.push(person);

        writeFile('./file.json', JSON.stringify(objValue), function(error, data) {
            if (error) {
                console.log('ERROR:', error);
            }

            console.log('SUCCESS:', data);
        })


    })
})
use("read", function read(input) {
    readFile('./file.json', 'utf8', (err, data) => {
        if (err) {
            console.log('ERROR:', err);
        }
        if (input.length === 0) {
            console.log('File Data:', JSON.parse(data));
        } else {
            let objValue = JSON.parse(data);

            for (let i = 0; i < objValue.data.length; i++) {
                if (input[0] === objValue.data[i].name) {
                    console.log(objValue.data[i]);
                }

            }
        }


    })
})

start();