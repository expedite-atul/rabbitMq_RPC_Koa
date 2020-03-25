"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
class RabbitMqProducerClass {
    async insertInQueue(queueName, data) {
        try {
            console.log("inserting in ==========>", queueName);
            connection_1.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });
        }
        catch (error) {
            console.log(`Error while inserting in rabbitmq queue ==> ${error}`);
            return Promise.reject(error);
        }
    }
}
exports.rabbitMqProducer = new RabbitMqProducerClass();
//# sourceMappingURL=publisher.js.map