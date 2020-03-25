import * as compose from 'koa-compose'
import * as Router from 'koa-router'
import { Context } from 'koa'
import fib from "./fib/fib.route";

const children = [
  { routes: fib, prefix: '/v1' }
]

export default function routes() {
  const router = new Router()
  router
    .get('/api', (ctx: Context) => {
      ctx.body = router.stack.map(i => i.path)
    });
  children.forEach(child => {
    const nestedRouter = new Router()
    child.routes(nestedRouter)
    router.use(child.prefix, nestedRouter.routes(), nestedRouter.allowedMethods())
  });
  return compose([router.routes(), router.allowedMethods()]);
}