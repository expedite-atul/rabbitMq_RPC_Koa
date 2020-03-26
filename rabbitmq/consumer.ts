import { channel, corr } from "./connection";
import { calcFib } from "../controllers/fib/fib.controller";

class RabbitMqConsumerClass {
    /**
     * @description method to consume from queue
     * @param queueName 
     */
    async consumeFromQueue(queueName: string) {
        try {
            let data = await channel.get(queueName);
            if (data) {
                channel.consume(queueName, async (data) => {
                    const id = parseInt(data.content.toString(), 10);
                    if (data.properties.correlationId === corr) {
                        console.log(id, data.properties.correlationId);
                        console.log(corr, 'coorelationId')
                        console.log(`[.] Got ${data.content.toString()}`);
                        setTimeout(() => { channel.close(); process.exit(0) }, 500);
                    }
                }, { noAck: true });
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