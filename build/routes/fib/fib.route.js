"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../controllers");
exports.default = (router) => {
    router
        .get('/fib', async (ctx) => {
        try {
            ctx.request.headers = { 'Accept': 'application/json', 'content-type': 'application/json' };
            let response = await controllers_1.fibController.getfib(ctx);
            ctx.body = response;
        }
        catch (error) {
            console.log(`we have an error in routes ==> ${error}`);
            return Promise.reject(error);
        }
    });
};
//# sourceMappingURL=fib.route.js.map