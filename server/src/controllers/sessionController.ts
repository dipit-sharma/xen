import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function startSession(_req: Request, res: Response) {
    const sessionId = uuidv4();
    // In a real app you'd persist or track the session
    res.json({ sessionId });
}
