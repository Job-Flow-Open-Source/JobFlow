import { query } from '../models/databaseModel';
import express, { Response, Request, NextFunction } from 'express';

export const resumeController = {
  retrieveResumes: async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params;
    try {
      const resumeQuery = 'SELECT * FROM resumes WHERE user_id = $1';
      const { rows } = await query(resumeQuery, [user_id]);
      res.locals.resumes = rows;
      return next();
    } catch (error: unknown) {
      return next({
        log: `Error occured in retrieveResumes middleware: ${error}`,
        message: 'Unable to retrieve resumes.',
      });
    }
  },
};

