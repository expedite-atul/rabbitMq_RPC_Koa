import { calcFib } from "../controllers/fib/fib.controller";
import { rabbitMq } from "./connection";

class RabbitMqConsumerClass {
    /**
     * @description method to consume from queue
     * @param queueName 
     */
    async consumeFromQueue(queueName: string) {
        try {
            let data = await rabbitMq.channel.get(queueName);
            if (data) {
                rabbitMq.channel.consume(queueName, async (data) => {
                    if (data.properties.correlationId === rabbitMq.corr) {
                        const n = parseInt(data.content.toString(), 10);
                        console.log(n, data.properties.correlationId);
                        console.log(`[.] Got ${data.content.toString()}`);
                        let result = await calcFib(n);
                        console.log(result, 'result');
                        setTimeout(() => { rabbitMq.channel.close(); process.exit(0) }, 500);
                    }
                    { noAck: true }
                });
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