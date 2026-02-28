import { io, Socket } from 'socket.io-client';
import type { NavigationUpdate } from '../types/navigation';

export interface SocketHandlers {
    onOpen?: () => void;
    onClose?: () => void;
    onError?: (err: any) => void;
    onNavigation?: (update: any) => void;
}

export class NavigatorSocket {
    private socket: Socket | null = null;
    private sessionId: string;
    private handlers: SocketHandlers;

    constructor(sessionId: string, handlers: SocketHandlers = {}) {
        this.sessionId = sessionId;
        this.handlers = handlers;
        this.connect();
    }

    private connect() {
        const url = import.meta.env.VITE_XEN_WS_URL || 'ws://localhost:4000';
        this.socket = io(url, {
            reconnection: true,
            reconnectionDelay: 2000,
        });

        this.socket.on('connect', () => {
            console.log('Connected to socket server');
            // Join the session
            this.socket?.emit('join', {
                sessionId: this.sessionId,
                type: 'phone',
            });
            this.handlers.onOpen?.();
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
            this.handlers.onClose?.();
        });

        this.socket.on('error', (err) => {
            console.error('Socket error:', err);
            this.handlers.onError?.(err);
        });

        this.socket.on('navigation', (update) => {
            console.log('Navigation update received:', update);
            this.handlers.onNavigation?.(update);
        });
    }

    send(update: NavigationUpdate) {
        if (this.socket?.connected) {
            this.socket.emit('navigation', update);
        } else {
            console.warn('Socket not connected, cannot send navigation update');
        }
    }

    close() {
        this.socket?.disconnect();
        this.socket = null;
    }
}
