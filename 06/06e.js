import {writeFile, readFile} from 'fs';
import {use, start, write} from "./05-httpFramework-f.js";
import jwt from "jsonwebtoken"
import { log } from 'console';

use('POST', 'sum', function (request, response) {
    response.write((parseInt(request.data.input1) + parseInt(request.data.input2)).toString());
    response.end();
});
use('GET', 'sum', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);
    response.write((parseInt(inputs[0]) + parseInt(inputs[1])).toString());
    response.end();
});
use('GET', 'log', function (request, response) {
    console.log('post data is:', request.data);
    response.end();
});
use('GET', 'file', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);

    readFile(inputs[0], function (error, fileBody){
        if(error){
            console.log('ERROR:', error);
            write(response, 400, 'ERROR:' + error)
        }
        else{
            response.write(fileBody);
            response.end();
        }
    });
});
use('POST', 'token', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{


            
            let jwtSecret = 'ads';
            console.log('fff2222', fileData)
            let dataObject = JSON.parse(fileData);
            let y = -1;
            console.log(Date.now()/1000 - jwt.verify(token, jwtSecret).iat);
            
            for(let i = 0 ; i < dataObject.records.length; i++){
                if(dataObject.records[i].user === request.data.user){
                    y = i;
                    break;                    
                }
                
            }
            console.log("aa",dataObject.records.length);
            if(y >= 0)
            {
              
                let signedtoken = jwt.sign(dataObject.records[y], jwtSecret)
                 write(response, 200, JSON.stringify({token : signedtoken}));

            }
            else{
//                dataObject.records.push(request.data);

                write(response, 500, "user are wrong")
            }
            
        }
    });
});

start(); 