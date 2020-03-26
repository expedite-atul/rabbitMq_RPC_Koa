import { rabbitMq } from "./connection";

class RabbitMqProducerClass {
    async insertInQueue(queueName: string, data: any) {
        try {
            console.log(`inserting in queue ==> ${queueName} with corr ==> ${rabbitMq.corr}`);
            rabbitMq.channel.sendToQueue(queueName,
                Buffer.from(JSON.stringify(data)),
                { correlationId: rabbitMq.corr, replyTo: 'rpc_queue1' },
                { persistent: true });
        }
        catch (error) {
            console.log(`Error while inserting in rabbitmq queue ==> ${error}`)
            return Promise.reject(error)
        }
    }
}
export const rabbitMqProducer = new RabbitMqProducerClass();