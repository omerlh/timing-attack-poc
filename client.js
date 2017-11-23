const request = require('request');
const {promisify} = require('util');
const get = promisify(request.get);
const stats = require("stats-lite");

async function main() {

    var shortest = {
        index: 0,
        time: 0
    }

    //warmup
    var response = await get({
        url : `http://localhost:8080/secure?pass=8888`,
        time : true
    });

    for (var i = 0 ; i < 9 ; i++) {
        var results = []
        var url = `http://localhost:8080/secure?pass=${i}888`;
        for (var j = 0 ; j < 20000 ; j++){
            var response = await get({
                url : url,
                time : true
            });

            results.push(response.elapsedTime);
        }

        time = stats.mean(results);

        console.log(`time: ${time}, index: ${i}`);


        if (shortest.time < time) {
            shortest.time = time;
            shortest.index = i;
        }
    }

    console.log(shortest);

    
}

main();