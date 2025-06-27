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
const serverUrl = 'https://wsrelay.sensibull.com/broker/1?consumerType=platform_pro';


const customHeaders = {
    'Accept-Encoding': 'gzip, deflate',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0',
    'Origin': 'https://web.sensibull.com'
};

const ws = new WebSocket(serverUrl, {
        headers: customHeaders
    });

    ws.on('open', () => {
        console.log('Connected to the WebSocket server');
        
        const msg = {
            "msgCommand": "subscribe",
            "dataSource": "screener-stats",
            "brokerId": 1,
            "tokens": [],
            "underlyingExpiry": [],
            "uniqueId": ""
        };

        ws.send(JSON.stringify(msg));
        console.log("Sent subscription request for screener-stats");
    });

    ws.on('message', (data) => {
        try {
            const message = lib.decodeData(data);

            // --- PING/PONG LOGIC ---
            // Check if the decoded message is a PING packet from the server.
            if (message.kind === lib.JR.CUSTOM_PING) {
                console.log('Received PING from server. Sending PONG back.');
                // The PONG message is a single byte with the value 254 (0xFE)
                const pongMessage = Buffer.from([254]);
                ws.send(pongMessage);
                return; // Stop processing this PING message.
            }
            // --- END PING/PONG LOGIC ---

            // If it's not a PING, process it as a regular data message.
            console.log("Successfully decoded message:", message);
            lib.print(message);
            
            sendData(JSON.stringify(message))
        } catch (e) {
            // Log the full error to see messages like "unexpected EOF"
            console.error("Failed to decode message:", e);
        }
    });

    ws.on('close', () => {
        console.log('Connection closed');
        process.exit(1);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error.message}`);
        process.exit(1);
    });