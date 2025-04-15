let fs = require('fs');

let input = process.argv.slice(3);
let command = process.argv[2];


let controllers = [
    {
        command: "sum",
        function:function sum(input){
            console.log(Number(input[0]) + Number(input[1]));
        }
    },
    {
        command: "minus",
        function:function minus(input){
            console.log(Number(input[0]) - Number(input[1]));
        }
    },
    {
        command: "print",
        function:function print(input){
            let obj = {
                name: input[0],
                family: input[1],
                email: input[2]
            }
        
            for (key in obj) {
                console.log(`value is ${obj[key]}`);
            }
        }
    },
    {
        command: "write",
        function:function write(input){
            let person = {
                name: input[0],
                family: input[1],
                email: input[2]
            }
        
            fs.writeFile('./data.txt', JSON.stringify(person), function (error, data) {
                if (error) {
                    console.log('ERROR:', error);
                }
        
                console.log('SUCCESS');
            })
        }
    },
    {
        command: "create",
        function:function create(input){
            fs.readFile('./file.json', (err, data) => {
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
        
                fs.writeFile('./file.json', JSON.stringify(objValue), function (error, data) {
                    if (error) {
                        console.log('ERROR:', error);
                    }
            
                    console.log('SUCCESS:', data);
                })
        
                
            })
        }
    },
    {
        command:"read",
        function:function read(input){
            fs.readFile('./file.json','utf8' , (err , data)=>{
                if (err) {
                    console.log('ERROR:', err);
                }
                if (input.length === 0){
                    console.log('File Data:', JSON.parse(data));
                }
                else {
                    let objValue = JSON.parse(data);
        
                    for (let index = 0; index < objValue.data.length; index++) {
                        if(input[0] === objValue.data[index].name){
                           console.log(objValue.data[index]);
                        }
                        
                    }
                }
        
                
            })
        }
    }
    
]


for(controller of controllers){
    if(controller.command === command){
        controller.function(input);
    }
}












