import { Request, Response } from 'express';
import { fetchDirections } from '../services/googleService';

export async function getRoute(req: Request, res: Response) {
    try {
        const { origin, destination } = req.body;
        if (!origin || !destination) {
            return res.status(400).json({ error: 'origin and destination required' });
        }
        const route = await fetchDirections(origin, destination);
        // here we can massage the response
        res.json(route);
    } catch (err: any) {
        console.error('route error', err);
        res.status(500).json({ error: err.message || 'internal error' });
    }
}
