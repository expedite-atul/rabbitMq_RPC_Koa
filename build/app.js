"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const config = require("config");
const routes_1 = require("./routes");
const bootstrap_1 = require("./utils/bootstrap");
const mongoose_1 = require("./db/mongoose");
const app = new Koa();
app.use(routes_1.default());
(async () => {
    try {
        const port = config.get('port');
        await mongoose_1.default();
        const server = app.listen(port);
        await bootstrap_1.default(server);
        console.log(`server started successfully`);
    }
    catch (error) {
        console.error(`We have an error in server initialization ==> ${error}`);
    }
})();
//# sourceMappingURL=app.js.map