"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = require("amqplib");
const config_1 = require("config");
const uuid_1 = require("uuid");
exports.corr = uuid_1.v1();
console.log(exports.corr);
class RabbitMqClass {
    async connectQueue() {
        try {
            const queue = await amqplib_1.connect(config_1.get("rabbitMq.url"));
            console.log("successfully connected to rabbitmq server");
            exports.channel = await queue.createChannel();
            exports.channel.assertQueue("rpc_queue1", { exclusive: true });
            exports.channel.prefetch(1);
            console.log(`[x] Awaiting RPC requests with corrId ==> ${exports.corr}`);
            return;
        }
        catch (error) {
            console.log(`Error while connecting to rabbitmq ==> ${error}`);
            return Promise.reject(error);
        }
    }
}
exports.rabbitMq = new RabbitMqClass();
//# sourceMappingURL=connection.js.map