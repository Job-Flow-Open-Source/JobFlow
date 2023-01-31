import express, { Response, Request, NextFunction } from 'express';
const router = express.Router();
import { applicationController } from '../controllers/applicationController';

router.get(
  '/:user_id',
  applicationController.retrieveApplications,
  (req: Request, res: Response) => res.status(200).json(res.locals.applications)
);

export default router;