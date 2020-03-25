"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeliveryControllers {
    async getDeliveryToken() {
        try {
            return 'token';
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
exports.DeliveryController = new DeliveryControllers();
//# sourceMappingURL=delivery.controller.js.map