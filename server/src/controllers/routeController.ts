import { Request, Response } from 'express';
import { fetchDirections } from '../services/googleService';
import { setCachedRoute } from '../services/routeCache';

export async function getRoute(req: Request, res: Response) {
    try {
        const { destination, origin, sessionId } = req.body;
        if (!destination || !origin || !sessionId) {
            return res.status(400).json({ error: 'destination, origin and sessionId required' });
        }
        const route = await fetchDirections(destination, origin);
        // cache for the websocket layer
        setCachedRoute(sessionId, route);
        // here we can massage the response
        res.json(route);
    } catch (err: any) {
        console.error('route error', err);
        res.status(500).json({ error: err.message || 'internal error' });
    }
}
