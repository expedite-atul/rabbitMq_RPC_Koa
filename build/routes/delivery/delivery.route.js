"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../controllers");
exports.default = (router) => {
    router
        .get('/secret', async (ctx) => {
        try {
            ctx.request.headers = { 'Accept': 'application/json', 'content-type': 'application/json' };
            let response = await controllers_1.DeliveryController.getDeliveryToken();
            return response;
        }
        catch (error) {
            console.log(`we have an error in routes ==> ${error}`);
            return Promise.reject(error);
        }
    });
};
//# sourceMappingURL=delivery.route.js.map