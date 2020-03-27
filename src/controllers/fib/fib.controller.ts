import { Context } from "koa";
import { rabbitMqProducer, rabbitMqConsumer } from "../../rabbitmq";

class FibControllers {
  /**
   * @description get token from deliveryApi
   * @param ctx Context
   */
  async getfib(ctx: Context) {
    try {
      await rabbitMqProducer.insertInQueue('rpc_queue1', ctx.request.query);
      let response = await rabbitMqConsumer.consumeFromQueue('rpc_queue1');
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export const fibController = new FibControllers();


export async function calcFib(n: number) {
  console.log(n, 'inside calc function');
  let arr = [0, 1];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1])
  }
  return arr[n];
};