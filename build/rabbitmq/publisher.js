"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
class RabbitMqProducerClass {
    async insertInQueue(queueName, data) {
        try {
            console.log(`inserting in queue ==> ${queueName} with corr ==> ${connection_1.rabbitMq.corr}`);
            connection_1.rabbitMq.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { correlationId: connection_1.rabbitMq.corr, replyTo: 'rpc_queue1' }, { persistent: true });
        }
        catch (error) {
            console.log(`Error while inserting in rabbitmq queue ==> ${error}`);
            return Promise.reject(error);
        }
    }
}
exports.rabbitMqProducer = new RabbitMqProducerClass();
//# sourceMappingURL=publisher.js.map