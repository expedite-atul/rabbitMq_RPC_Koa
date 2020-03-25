import { channel } from "./connection";

class RabbitMqProducerClass {
    async insertInQueue(queueName: string, data: any) {
        try {
            console.log("inserting in ==========>", queueName);
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });
        }
        catch (error) {
            console.log(`Error while inserting in rabbitmq queue ==> ${error}`)
            return Promise.reject(error)
        }
    }
}
export const rabbitMqProducer = new RabbitMqProducerClass();

// export const insertDbFalbackInQueue = (model, criteria, update) => {
//     try {
//         function response() {
//             let { model, criteria, update } = JSON.parse('data');
//             dbManager.updateOne(model, criteria, update, {});
//         }
//         insertInQueue(DATABASE.QUEUE.MONGO_FALLBACK, response.toString().replace('data', JSON.stringify({ model, criteria, update })))
//     }
//     catch (error) {
//         //console.log("error while inserting mongo fallback in queue", error)
//     }
// }


// export const insertNotificationInQueue = (categoryId, cursor, payload, pushData, skip, limit) => {
//     try {

//         let dataForPush = {
//             'categoryId': categoryId,
//             'cursor': cursor,
//             'payload': payload,
//             'pushData': pushData,
//             'skip': skip,
//             'limit': limit
//         }
//         insertInQueue(DATABASE.QUEUE.REDIS_PUSH, JSON.stringify(dataForPush))
//     }
//     catch (error) {
//         //console.log("error while inserting mongo fallback in queue", error)
//     }
// }


// // export const insertUserInElasticQueue = (userData) => {
// //     try {

// //         insertInQueue(DATABASE.QUEUE.ELASTIC_USER, JSON.stringify(userData))
// //     }
// //     catch (error) {
// //         //console.log("error while inserting mongo fallback in queue", error)
// //     }
// // }