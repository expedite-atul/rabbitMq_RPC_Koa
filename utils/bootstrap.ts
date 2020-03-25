import { rabbitMq } from "../rabbitmq";

export default async function bootstrap(server) {
    try {
        await rabbitMq.connectQueue();
    } catch (error) {
        console.log(`Error in bootstrap ==> ${error}`);
    }
}