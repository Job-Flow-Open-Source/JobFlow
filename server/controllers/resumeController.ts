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
        log: `Error occurred in retrieveResumes middleware: ${error}`,
        message: 'Unable to retrieve resumes.',
      });
    }
  },
  addResume: async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, resume_name } = req.body;
    try {
      const addResumeQuery = 'INSERT INTO resumes (user_id, resume_name) VALUES ($1, $2) RETURNING *'
      const { rows } = await query(addResumeQuery, [user_id, resume_name]);
      res.locals.newResume = rows[0];
      return next();
    } catch (error: unknown) {
      return next({
        log: `Error occurred in addResume middleware: ${error}`,
        message: 'Unable to add resume'
      });
    }
  }
};
