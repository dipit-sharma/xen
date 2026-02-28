import type { DirectionsResponse } from './googleService';

// simple in-memory store keyed by sessionId
const cache: Record<string, DirectionsResponse> = {};

export function setCachedRoute(sessionId: string, route: DirectionsResponse) {
    cache[sessionId] = route;
}

export function getCachedRoute(sessionId: string): DirectionsResponse | undefined {
    return cache[sessionId];
}

export function clearCachedRoute(sessionId: string) {
    delete cache[sessionId];
}
