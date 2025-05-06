import {writeFile, readFile} from 'fs'

let name = process.argv[2];
let body = process.argv[3];

writeFile(`./${name}`, body, err =>{
    if(err)
    {
        console.log("error");
    }
    else{
        console.log("success");
    }
})
