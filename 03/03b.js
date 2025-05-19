import { writeFile, readFile } from 'fs'

let input = process.argv.slice(3);
let command = process.argv[2];

if (command === 'sum') {
    console.log(Number(input[0]) + Number(input[1]));
} else if (command === 'minus') {

    console.log(Number(input[0]) - Number(input[1]));
} else if (command === 'print') {
    let obj = {
        name: input[0],
        family: input[1],
        email: input[2]
    }

    for (key in obj) {
        console.log(`value is ${obj[key]}`);
    }
} else if (command === 'write') {
    let person = {
        name: input[0],
        family: input[1],
        email: input[2]
    }

    writeFile('./data.txt', JSON.stringify(person), function(error, data) {
        if (error) {
            console.log('ERROR:', error);
        }

        console.log('SUCCESS:', data);
    })
} else if (command === 'create') {
    readFile('./file.json', (err, data) => {
        if (err) {
            console.log('ERROR:', error);
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
} else if (command === 'read') {
    readFile('./file.json', 'utf8', (err, data) => {
        if (err) {
            console.log('ERROR:', err);
        }
        if (input.length === 0) {
            console.log('File Data:', JSON.parse(data));
        } else {
            let objValue = JSON.parse(data);
            let found = false;
            for (let i = 0; i < objValue.data.length; i++) {
                if (input[0] === objValue.data[i].name) {
                    found = true;
                    console.log(objValue.data[i]);
                }
            }
            if (!found) {
                console.log('item not found!');

            }
        }


    })
} else {
    console.log('Command not found');
}
