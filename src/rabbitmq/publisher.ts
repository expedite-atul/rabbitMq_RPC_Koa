import { rabbitMq } from "./connection";

class RabbitMqProducerClass {
    async getResponse(q: any) {
        try {
            return new Promise(async (resolve) => {
                await rabbitMq.channel.consume(q.queue, function (msg) {
                    if (msg.properties.correlationId == rabbitMq.corr) {
                        console.log("**************replied data is*************:", msg.content.toString());
                        resolve(msg.content.toString());
                        // setTimeout(function () {
                        //     connection.close();
                        //     process.exit(0)
                        // }, 500);
                        // return msg.content.toString()
                    }
                }, { noAck: true });
            });
        } catch (error) {
            console.log(`Error while returning result from server rabbitMq ==> ${error}`);
            return Promise.reject(error);
        }
    }
    async insertInQueue(queueName: string, data: any) {
        try {

            const q = await rabbitMq.channel.assertQueue("", { exclusive: true });
            console.log("request from queue", q.queue);
            rabbitMq.channel.sendToQueue("queueName",
                Buffer.from(JSON.stringify(data)),
                { correlationId: rabbitMq.corr, replyTo: q.queue },
                { persistent: true });
            return q;
        }
        catch (error) {
            console.log(`Error while inserting in rabbitmq queue ==> ${error}`);
            return Promise.reject(error);
        }
    }
}
export const rabbitMqProducer = new RabbitMqProducerClass();