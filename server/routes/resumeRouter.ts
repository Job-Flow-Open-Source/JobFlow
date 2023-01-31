import express, { Response, Request, NextFunction } from 'express';
const router = express.Router();
import { resumeController } from '../controllers/resumeController';

router.get(
  '/:user_id',
  resumeController.retrieveResumes,
  (req: Request, res: Response) => res.status(200).json(res.locals.resumes)
);

export default router;
