import {writeFile, readFile, existsSync, readdirSync, lstatSync} from 'fs'



let name = process.argv[2];
let ty = lstatSync(name).isFile();
if(ty === true){
    if(ty === true)
        readFile(`./${name}`,'utf-8', (err, data) =>{
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
    const directoryPath = name;
    
    
    
        
        // Use fs.readdirSync to read the contents of the directory synchronously
        const fileList = readdirSync(directoryPath);
        
        console.log('show directory:', fileList);

}