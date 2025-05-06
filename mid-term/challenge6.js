import { writeFile, readFile, existsSync, readdirSync, writeFileSync , lstatSync} from 'fs'

let command = process.argv[2];

if(command == 'createFile')
{


    writeFile(`./${process.argv[3]}`, process.argv[4], err =>{
        if(err)
        {
            console.log("error");
        }
        else{
            console.log("success");
        }
    })

}
else if(command == 'open')
{
    
    let ty = lstatSync(process.argv[3]).isFile();
if(ty === true){
    if(ty === true)
        readFile(`./${process.argv[3]}`,'utf-8', (err, data) =>{
            if(err){
                console.log("error");
            }
            else{
                console.log("data is: ", data);
            }
        })
}
else
{
    const directoryPath = process.argv[3];
    
    
    
        
        // Use fs.readdirSync to read the contents of the directory synchronously
        const fileList = readdirSync(directoryPath);
        
        console.log('show directory:', fileList);

}
}
else if(command == 'createRecord'){
    let input = process.argv.slice(3);

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
    objValue.records.push(person);
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



}