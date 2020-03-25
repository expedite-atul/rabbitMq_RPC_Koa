import { connect } from "amqplib";
import { get } from "config";
export let channel;
class RabbitMqClass {
    async connectQueue() {
        try {
            const queue = await connect(get("rabbitMq.url"))
            console.log("successfully connected to rabbitmq server");
            channel = await queue.createChannel();
            channel.assertQueue("rpc_queue1", { durable: true });
            channel.prefetch(1);
            console.log('[x] Awaiting RPC requests');
            return;
        }
        catch (error) {
            console.log(`Error while connecting to rabbitmq ==> ${error}`);
            return Promise.reject(error);
        }
    }
}
export const rabbitMq = new RabbitMqClass();