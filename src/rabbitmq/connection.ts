import { connect } from "amqplib";
import { get } from "config";
import { v1 as uuid } from 'uuid';
class RabbitMqClass {
    public channel;
    public corr: string;
    async connectQueue() {
        try {
            const queue = await connect(get("rabbitMq.url"))
            console.log("successfully connected to rabbitmq server");
            this.channel = await queue.createChannel();
            this.channel.assertQueue("rpc_queue1", { exclusive: true });
            this.channel.prefetch(1);
            this.corr = uuid();
            console.log(`[x] Awaiting RPC requests with corrId ==> ${this.corr}`);
            return;
        }
        catch (error) {
            console.log(`Error while connecting to rabbitmq ==> ${error}`);
            return Promise.reject(error);
        }
    }
}
export const rabbitMq = new RabbitMqClass();