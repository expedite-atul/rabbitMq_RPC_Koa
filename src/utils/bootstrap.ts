import { rabbitMq, rabbitMqConsumer } from "../rabbitmq";

export default async function bootstrap(server) {
    try {
        await rabbitMq.connectQueue();
        await rabbitMqConsumer.consumeFromQueue('queueName');
    } catch (error) {
        console.log(`Error in bootstrap ==> ${error}`);
    }
}