"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rabbitmq_1 = require("../../rabbitmq");
class FibControllers {
    async getfib(ctx) {
        try {
            await rabbitmq_1.rabbitMqProducer.insertInQueue('rpc_queue1', ctx.request.query);
            let response = await rabbitmq_1.rabbitMqConsumer.consumeFromQueue('rpc_queue1');
            console.log(response);
            return response;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
exports.fibController = new FibControllers();
async function calcFib(n) {
    console.log(n);
    let arr = [0, 1];
    for (let i = 2; i < n + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr[n];
}
exports.calcFib = calcFib;
;
//# sourceMappingURL=fib.controller.js.map