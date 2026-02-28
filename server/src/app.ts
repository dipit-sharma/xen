import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';

import routeRouter from './routes/route';
import sessionRouter from './routes/session';
import { initializeSockets } from './sockets';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

app.use('/route', routeRouter);
app.use('/session', sessionRouter);

// simple health check
app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

import { errorHandler } from './middleware/errorHandler';
app.use(errorHandler);

initializeSockets(io);

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`xen-server listening on ${port}`);
});
