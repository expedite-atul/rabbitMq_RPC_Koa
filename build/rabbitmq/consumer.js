"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fib_controller_1 = require("../controllers/fib/fib.controller");
const connection_1 = require("./connection");
class RabbitMqConsumerClass {
    async consumeFromQueue(queueName) {
        try {
            let data = await connection_1.rabbitMq.channel.get(queueName);
            if (data) {
                connection_1.rabbitMq.channel.consume(queueName, async (data) => {
                    if (data.properties.correlationId === connection_1.rabbitMq.corr) {
                        const n = parseInt(data.content.toString(), 10);
                        console.log(n, data.properties.correlationId);
                        console.log(`[.] Got ${data.content.toString()}`);
                        let result = await fib_controller_1.calcFib(n);
                        console.log(result, 'result');
                        setTimeout(() => { connection_1.rabbitMq.channel.close(); process.exit(0); }, 500);
                    }
                    {
                        noAck: true;
                    }
                });
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