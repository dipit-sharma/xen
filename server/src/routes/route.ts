import { Router, Request, Response } from 'express';
import { getRoute } from '../controllers/routeController';

const router = Router();

// POST /route
router.post('/', getRoute);

export default router;
