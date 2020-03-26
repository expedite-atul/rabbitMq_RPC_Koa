"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
class RabbitMqConsumerClass {
    async consumeFromQueue(queueName) {
        try {
            let data = await connection_1.channel.get(queueName);
            if (data) {
                connection_1.channel.consume(queueName, async (data) => {
                    const id = parseInt(data.content.toString(), 10);
                    if (data.properties.correlationId === connection_1.corr) {
                        console.log(id, data.properties.correlationId);
                        console.log(connection_1.corr, 'coorelationId');
                        console.log(`[.] Got ${data.content.toString()}`);
                        setTimeout(function () { connection_1.channel.close(); process.exit(0); }, 500);
                    }
                }, { noAck: true });
            }
            else {
                console.log(`ugh-oh! Empty queue!`);
            }
        }
        catch (error) {
            console.log(`Error while consuming from rabbitmq queue ==> ${error}`);
            return Promise.reject(error);
        }
    }
}
exports.rabbitMqConsumer = new RabbitMqConsumerClass();
//# sourceMappingURL=consumer.js.map