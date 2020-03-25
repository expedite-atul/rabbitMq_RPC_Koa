import { channel } from "./connection";
import { calcFib } from "../controllers/fib/fib.controller";

class RabbitMqConsumerClass {
    /**
     * @description method to consume from queue
     * @param queueName 
     */
    async consumeFromQueue(queueName) {
        try {
            let data = await channel.get(queueName);
            if (data) {
                let content = data.content.toString();
                console.log(typeof (content), content * 1);
                let response = await calcFib(Number(content.n));
                return response;
                // channel.ack(response);
            } else {
                console.log(`ugh-oh! Empty queue!`);
            }
        }
        catch (error) {
            console.log(`Error while consuming from rabbitmq queue ==> ${error}`)
            return Promise.reject(error);
        }
    }
}
export const rabbitMqConsumer = new RabbitMqConsumerClass();