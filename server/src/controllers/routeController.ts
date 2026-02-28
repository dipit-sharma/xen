import { Request, Response } from 'express';
import { fetchDirections } from '../services/googleService';

export async function getRoute(req: Request, res: Response) {
    try {
        const { destination, origin } = req.body;
        if (!destination || !origin) {
            return res.status(400).json({ error: 'destination and origin required' });
        }
        const route = await fetchDirections(destination, origin);
        // here we can massage the response
        res.json(route);
    } catch (err: any) {
        console.error('route error', err);
        res.status(500).json({ error: err.message || 'internal error' });
    }
}
