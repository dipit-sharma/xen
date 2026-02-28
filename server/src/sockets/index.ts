import { Server, Socket } from 'socket.io';

interface SessionMap {
    [sessionId: string]: { phone?: Socket; bike?: Socket };
}

const sessions: SessionMap = {};

export function initializeSockets(io: Server) {
    io.on('connection', (socket: Socket) => {
        console.log('client connected', socket.id);

        socket.on('join', (data: { sessionId: string; type: 'phone' | 'bike' }) => {
            const { sessionId, type } = data;
            sessions[sessionId] = sessions[sessionId] || {};
            sessions[sessionId][type] = socket;
            socket.data.sessionId = sessionId;
            socket.data.type = type;
            console.log(`socket ${socket.id} joined session ${sessionId} as ${type}`);
        });

        socket.on('navigation', (update: any) => {
            const sessionId = socket.data.sessionId;
            if (!sessionId) return;
            const pair = sessions[sessionId];
            if (!pair) return;
            // relay to other side
            const targetType = socket.data.type === 'phone' ? 'bike' : 'phone';
            pair[targetType]?.emit('navigation', update);
        });

        socket.on('disconnect', () => {
            const sessionId = socket.data.sessionId as string | undefined;
            if (sessionId && sessions[sessionId]) {
                const type = socket.data.type as 'phone' | 'bike' | undefined;
                if (type) {
                    delete sessions[sessionId][type];
                }
                if (Object.keys(sessions[sessionId]).length === 0) {
                    delete sessions[sessionId];
                }
            }
            console.log('client disconnected', socket.id);
        });
    });
}
