"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const fib_controller_1 = require("../controllers/fib/fib.controller");
class RabbitMqConsumerClass {
    async consumeFromQueue(queueName) {
        try {
            let data = await connection_1.channel.get(queueName);
            if (data) {
                let content = data.content.toString();
                console.log(typeof (content), content * 1);
                let response = await fib_controller_1.calcFib(Number(content.n));
                return response;
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