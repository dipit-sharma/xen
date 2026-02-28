import type { NavigationUpdate } from '../types/navigation';

export interface SocketHandlers {
    onOpen?: () => void;
    onClose?: () => void;
    onError?: (err: Event) => void;
}

export class NavigatorSocket {
    private ws: WebSocket | null = null;
    private sessionId: string;
    private handlers: SocketHandlers;
    private reconnectInterval = 2000;

    constructor(sessionId: string, handlers: SocketHandlers = {}) {
        this.sessionId = sessionId;
        this.handlers = handlers;
        this.connect();
    }

    private connect() {
        const url = (import.meta.env.VITE_XEN_WS_URL || 'ws://localhost:4000') + '/ws';
        this.ws = new WebSocket(url);
        this.ws.addEventListener('open', () => {
            this.send({ sessionId: this.sessionId, currentStep: 0, timestamp: Date.now() });
            this.handlers.onOpen?.();
        });
        this.ws.addEventListener('close', () => {
            this.handlers.onClose?.();
            setTimeout(() => this.connect(), this.reconnectInterval);
        });
        this.ws.addEventListener('error', (e) => {
            this.handlers.onError?.(e);
        });
    }

    send(update: NavigationUpdate) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(update));
        }
    }

    close() {
        this.ws?.close();
    }
}
