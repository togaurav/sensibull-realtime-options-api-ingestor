const amqp = require("amqplib");

let channel, connection;

const username = 'closefriend';
const password = 'closefriend@2021';
const host = '192.168.5.51';
const exchangeName = 'rnd';
const queueName = 'sensibull';

const connectionString = `amqp://${username}:${password}@${host}`;

async function setup() {
    try {
        connection = await amqp.connect(connectionString);
        channel = await connection.createChannel();
        // Declare exchange
        await channel.assertExchange(exchangeName, 'direct', { durable: true });
        // Declare queue
        await channel.assertQueue(queueName, { durable: true });
        // Bind queue to exchange
        await channel.bindQueue(queueName, exchangeName, queueName);
        console.log("Connected to RabbitMQ and setup complete");
        return true; // Indicate successful setup
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        return false; // Indicate setup failure
    }

    // Handle connection closure
    connection.on("close", () => {
        console.log("Connection to RabbitMQ closed");
        // Attempt to reconnect or handle the closure gracefully
    });
}


async function sendData(data) {
    // Check if the channel is defined
    if (!channel) {
        console.error("Channel is not defined. Cannot send data.");
        return;
    }

    try {
        // Parse JSON string to object
        let jsonObject = JSON.parse(JSON.stringify(data));
        // Add property to object
        jsonObject["data_received_at"] = new Date().getTime();
        // Convert back to JSON string
        let jsonData = JSON.stringify(jsonObject);
        // Publish message to exchange
        await channel.publish(exchangeName, queueName, Buffer.from(jsonData));
        console.log("Message sent successfully");
    } catch (error) {
        console.error('Error sending message:', error);
    }
}


function closeConnection() {
    if (connection) {
        connection.close();
        console.log("RabbitMQ connection closed");
    }
}

// Listen for process exit event
process.on('exit', () => {
    closeConnection();
});

// Listen for SIGINT (Ctrl+C) event
process.on('SIGINT', () => {
    closeConnection();
    process.exit();
});

// Listen for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    closeConnection();
    process.exit(1);
});


module.exports = {
    setup,
    sendData
};
