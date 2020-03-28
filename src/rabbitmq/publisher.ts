import { rabbitMq } from "./connection";

class RabbitMqProducerClass {
    async insertInQueue(queueName: string, data: any) {
        try {
            const q = await rabbitMq.channel.assertQueue("", { exclusive: true });
            console.log(`inserting in queue ==> ${queueName} with corr ==> ${rabbitMq.corr}`);
            rabbitMq.channel.consume(q.queue, function (msg) {
                if (msg.properties.correlationId == rabbitMq.corr) {
                    console.log(' [.] Got %s', msg.content.toString());
                    setTimeout(function () {
                        rabbitMq.channel.close();
                        process.exit(0)
                    }, 500);
                }
            }, { noAck: true });
            rabbitMq.channel.sendToQueue(queueName,
                Buffer.from(JSON.stringify(data)),
                { correlationId: rabbitMq.corr, replyTo: q },
                { persistent: true });
        }
        catch (error) {
            console.log(`Error while inserting in rabbitmq queue ==> ${error}`);
            return Promise.reject(error);
        }
    }
}
export const rabbitMqProducer = new RabbitMqProducerClass();