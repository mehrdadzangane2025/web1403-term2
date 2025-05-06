import { writeFile, readFile, existsSync, readdirSync, writeFileSync } from 'fs'
let input = process.argv.slice(2);

readFile('./database.json', (err, data) => {
    if (err) {
        console.log('ERROR:', err);
    }

    let person = {
        name: input[0],
        family: input[1],
        email: input[2]
    }
    let objValue = JSON.parse(data);
    for (let index = 0; index < objValue.records.length; index++) {
        if(input[0] === objValue.records[index].name){
            objValue.records[index].family = input[1];
            objValue.records[index].email = input[2];

        }
    }

writeFile('./database.json', JSON.stringify(objValue), function (error, data) {
        if (error) {
            console.log('ERROR:', error);
        }

        console.log('SUCCESS:', data);
    })


})
