import { calcFib } from "../controllers/fib/fib.controller";
import { rabbitMq } from "./connection";
var amqp = require('amqplib/callback_api');

class RabbitMqConsumerClass {
    /**
     * @description method to consume from queue
     * @param queueName 
     */
    async consumeFromQueue(queueName: string) {
        try {
            rabbitMq.channel.assertQueue("queueName", {
                durable: false
            });
            rabbitMq.channel.consume("queueName", async (data) => {

                let request = JSON.parse(data.content.toString()).n;
                console.log(`request param ==> ${request} and type is ${typeof (request)}`);
                let response = await calcFib(request);
                // setTimeout(() => { rabbitMq.channel.close(); process.exit(0) }, 500);
                console.log("going to return on queue", data.properties.replyTo);
                rabbitMq.channel.sendToQueue(data.properties.replyTo,
                    Buffer.from(response.toString()), {
                    correlationId: data.properties.correlationId
                });
            }, { noAck: true });
        }
        catch (error) {
            console.error(`Error while consuming the queue ==> ${error}`);
            Promise.reject(error);
        }

    }
}
export const rabbitMqConsumer = new RabbitMqConsumerClass();