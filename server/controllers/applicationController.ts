import { query } from '../models/databaseModel';
import express, { Response, Request, NextFunction } from 'express';

export const applicationController = {
  retrieveApplications: async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params;
    try {
      const resumeQuery = 'SELECT * FROM applications WHERE user_id = $1';
      const { rows } = await query(resumeQuery, [user_id]);
      res.locals.applications = rows;
      return next();
    } catch (error: unknown) {
      return next({
        log: `Error occured in retrieveApplications middleware: ${error}`,
        message: 'Unable to retrieve applications.',
      });
    }
  },
};

