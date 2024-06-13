let currentTime = new Date();
let startTradingTime = new Date();
startTradingTime.setHours(9, 0, 0); // Set start time to 9:00 AM
let endTradingTime = new Date();
endTradingTime.setHours(15, 30, 0); // Set end time to 3:30 PM
if (currentTime < startTradingTime || currentTime > endTradingTime) {
    console.log("Non trading time :" + currentTime)
    return;
}

console.log("Connecting to rabbitmq")
const { setup, sendData } = require('./rabbitmq.js');

async function call_rabbitmq_setup() {
    const isConnected = await setup();
    if (isConnected) {
        // Proceed with further execution
    } else {
        // Handle setup failure
        console.error('Failed to connect to RabbitMQ. Exiting...');
        process.exit(1);
    }
}

call_rabbitmq_setup();

const WebSocket = require('ws');
const lib = require('./lib.js');
// Replace 'ws://your-websocket-server-url' with the actual WebSocket server URL
const serverUrl = 'https://wsrelay.sensibull.com/broker/1?consumerType=platform_pro';


const customHeaders = {
    'Accept-Encoding': 'gzip, deflate',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0',
    'Origin': 'https://web.sensibull.com'
};

var expiries = lib.expiries();

expiries = [expiries.shift()]

expiries.forEach((expiry) => {


    const ws = new WebSocket(serverUrl, {
        headers: customHeaders
    });

    ws.on('open', () => {
        // 14286351
        console.log('Connected to the WebSocket server');

        let scrips = [];

        const expiries = lib.expiries();

        lib.instruments().forEach(i => {

            scrips.push(
                { "underlying": i, "expiry": expiry },

            );

        })


        // scrips = [scrips.shift()];
        // underlying-stats

        // console.log(scrips);
        let message = {
            "msgCommand": "subscribe", "dataSource": "option-chain", "brokerId": 1, "tokens": [], "underlyingExpiry": scrips
            , "uniqueId": ""
        };




        // Debug

        scrips = scrips.map(script=>script.underlying);
        let msg = { "msgCommand": "subscribe", "dataSource": "underlying-stats", "brokerId": 1, "tokens": scrips, "underlyingExpiry": [], "uniqueId": "" };
        // console.log(msg);

        msg = JSON.stringify(msg);
        ws.send(msg);







    });

    ws.on('message', (data) => {
        // console.log(`Received: ${data}`);
        let message = lib.decodeData(data);
        console.log(message)
        lib.print(message)

    });

    ws.on('close', () => {
        console.log('Connection closed');
        process.exit(1);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error.message} ${error}`);
        process.exit(1);
    });

    // To send a message after the connection is established (you can do this anytime)
    // ws.send('Your message here


})
