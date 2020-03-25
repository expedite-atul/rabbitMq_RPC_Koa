"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rabbitmq_1 = require("../rabbitmq");
async function bootstrap(server) {
    try {
        await rabbitmq_1.rabbitMq.connectQueue();
    }
    catch (error) {
        console.log(`Error in bootstrap ==> ${error}`);
    }
}
exports.default = bootstrap;
//# sourceMappingURL=bootstrap.js.map