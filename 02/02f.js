let fs = require('fs');

let input = process.argv.slice(3);
let command = process.argv[2];
if(command === "sum"){
    console.log(Number(input[0]) + Number(input[1]));
}else if(command === 'minus'){
    console.log(Number(input[0]) - Number(input[1]));
}else if(command === 'print'){
    let obj1 = {
        name:input[0],
        family:input[1],
        email:input[2]
    }
    for (const key in obj1) {
        console.log(`value is ${obj1[key]}`);

    }
}
else if(command === "write"){
    let person = {
        name:input[0],
        family:input[1],
        email:input[2]
    }
    fs.writeFile('./data.txt', JSON.stringify(person), function(err, data){
        if(err){
            console.log('error', err);
        }
        console.log('SUCCESS', data);
    })
}
else if(command === 'create')
{
    fs.readFile('./file.json', (err, data) => {
        if(err){
            console.log('error', err);
        }
        let person = {
            name:input[0],
            family:input[1],
            email:input[2]
        }

        let objValue = JSON.parse(data);
        objValue.data.push(person);

        fs.writeFile('./file.json', JSON.stringify(objValue), functiopn(err, data){
            if(err){
                console.log('error', err)
            }

            console.log('SUCCESS', data)
        })
    })
}
else{
    console.log('command not found!!');
}