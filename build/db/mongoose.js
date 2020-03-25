"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config = require("config");
const dbUrl = config.get('dbConfig.dbUrl');
async function connectDatabase() {
    mongoose_1.set('debug', true);
    mongoose_1.connection.on('error', err => {
        console.error('%s', err);
    });
    mongoose_1.connection.on('close', () => {
        console.log('Database connection closed.');
    });
    await mongoose_1.connect(dbUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose_1.connection.on('disconnected', async function () {
        console.log('MongoDB disconnected!');
        await mongoose_1.connect(dbUrl, { server: { auto_reconnect: true } });
    });
    console.log(`Connected to ${dbUrl}`);
    return;
}
exports.default = connectDatabase;
//# sourceMappingURL=mongoose.js.map