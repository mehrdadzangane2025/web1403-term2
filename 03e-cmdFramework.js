
let input = process.argv.slice(3);
let command = process.argv[2];


let controllers = []

function start() {
    for(let controller of controllers){
        if(controller.command === command){
            controller.function(input);
        }
    }
}

function use(name,func){
    let item = {
        command : name,
        function : func
    }

    controllers.push(item);
}

export {
    start,
    use
}