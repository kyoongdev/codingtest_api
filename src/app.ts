import Koa from 'koa';
import { apolloServer } from '@graphql/server';
import bodyParser from 'koa-bodyparser';
import { createDB } from './db/mongoose';

const app = new Koa();

// Connect to MongoDB Server
const db = createDB();

// Init Apollo Server
const server = apolloServer.init(db);

app.use(bodyParser());

server.applyMiddleware({ app, path: '/', cors: true });

export default app;
