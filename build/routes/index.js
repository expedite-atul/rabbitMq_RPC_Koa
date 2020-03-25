"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compose = require("koa-compose");
const Router = require("koa-router");
const fib_route_1 = require("./fib/fib.route");
const children = [
    { routes: fib_route_1.default, prefix: '/v1' }
];
function routes() {
    const router = new Router();
    router
        .get('/api', (ctx) => {
        ctx.body = router.stack.map(i => i.path);
    });
    children.forEach(child => {
        const nestedRouter = new Router();
        child.routes(nestedRouter);
        router.use(child.prefix, nestedRouter.routes(), nestedRouter.allowedMethods());
    });
    return compose([router.routes(), router.allowedMethods()]);
}
exports.default = routes;
//# sourceMappingURL=index.js.map