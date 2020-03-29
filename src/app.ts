import * as Koa from 'koa';
import * as config from 'config';
import routes from './routes';
import bootstrap from './utils/bootstrap';
import connectDatabase from './db/mongoose';

const app = new Koa();
app.use(routes());
(async () => {
    try {
        const port = config.get<string>('port');
        await connectDatabase();
        const server = app.listen(port);
        await bootstrap(server);
        console.log(`server started successfully`);
    } catch (error) {
        console.error(`We have an error in server initialization ==> ${error}`);
        Promise.reject(error);
    }
})();