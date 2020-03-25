import { connect, set, connection as db } from 'mongoose'
import * as config from 'config'

const dbUrl = config.get<string>('dbConfig.dbUrl');

export default async function connectDatabase() {
  set('debug', true)
  db.on('error', err => {
    console.error('%s', err)
  })
  db.on('close', () => {
    console.log('Database connection closed.')
  });
  await connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  db.on('disconnected', async function () {
    console.log('MongoDB disconnected!');
    await connect(dbUrl, { server: { auto_reconnect: true } });
  });
  console.log(`Connected to ${dbUrl}`);
  return
}
