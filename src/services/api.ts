import type { RouteResponse } from '../types/navigation';

const SERVER_BASE = import.meta.env.VITE_XEN_SERVER_URL || 'http://localhost:4000';

export async function fetchRoute(destination: string, origin: string): Promise<RouteResponse> {
    const res = await fetch(`${SERVER_BASE}/route`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, origin }),
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch route: ${res.statusText}`);
    }
    const data = await res.json();
    // assume server already returns data matching RouteResponse
    return data as RouteResponse;
}
