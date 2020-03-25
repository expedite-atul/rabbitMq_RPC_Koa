import * as Router from 'koa-router';
import { fibController } from '../../controllers';

export default (router: Router) => {
  router
    .get('/fib',
      async (ctx) => {
        try {
          ctx.request.headers = { 'Accept': 'application/json', 'content-type': 'application/json' };
          let response = await fibController.getfib(ctx);
          ctx.body = response;
        }
        catch (error) {
          console.log(`we have an error in routes ==> ${error}`);
          return Promise.reject(error);
        }
      }
    )
}