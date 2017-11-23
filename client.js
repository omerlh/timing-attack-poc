const request = require('request');
const {promisify} = require('util');
const get = promisify(request.get);
const stats = require("stats-lite");

function binarysummary(results, w){
    const L1 = 50 - w;
    const R1 = 50 + w;

    var items = [];

    items.push(stats.percentile(results, L1 / 100));
    items.push(stats.percentile(results, R1 / 100));

    return stats.mean(items);
}

function quadsummary(results, w){
    const L1 = 50 - w;
    const L2 = (L1 + 50) / 2;
    const R1 = 50 + w;
    const R2 = (R1 + 50) / 2;

    var items = [];

    items.push(stats.percentile(results, L1 / 100));
    items.push(stats.percentile(results, L2 / 100));
    items.push(stats.percentile(results, R1 / 100));
    items.push(stats.percentile(results, R2 / 100));

    return stats.mean(items);
}

function septasummary(results, w){
    const L1 = 50 - w;
    const L2 = 50 + w;
    const L3 = L1 / 2;
    const M = 50;
    const R1 = 50 + w;
    const R2 = (R1 + 50) / 2;
    const R3 = (R1 + 100) / 2;

    var items = [];

    items.push(stats.percentile(results, L1 / 100));
    items.push(stats.percentile(results, L2 / 100));
    items.push(stats.percentile(results, L3 / 100));
    items.push(stats.percentile(results, M / 100));
    items.push(stats.percentile(results, R1 / 100));
    items.push(stats.percentile(results, R2 / 100));
    items.push(stats.percentile(results, R3 / 100));

    return stats.mean(items);
}

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

    for (var i = 0 ; i < 10 ; i++) {
        var results = []
        var url = `http://localhost:8080/secure?pass=${i}888`;
        for (var j = 0 ; j < 20000 ; j++){
            var response = await get({
                url : url,
                time : true
            });

            results.push(response.elapsedTime);
        }

        const w = 30;

        time = stats.septasummary(results);

        console.log(`time: ${time} index: ${i}`);


        if (shortest.time < time) {
            shortest.time = time;
            shortest.index = i;
        }
    }

    console.log(shortest);

    
}

main();