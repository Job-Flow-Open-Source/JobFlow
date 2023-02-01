import { query } from '../models/databaseModel';
import express, { Response, Request, NextFunction } from 'express';

export const applicationController = {
  retrieveApplications: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
  addApplication: async (req: Request, res: Response, next: NextFunction) => {
    const {
      coverletter_status,
      date_submitted,
      submission_method,
      company,
      job_title,
      resume_name,
      link,
      user_id,
    } = req.body;
    const resumeResult = await query('SELECT _id FROM resumes WHERE user_id = $1 AND resume_name = $2', [user_id, resume_name]);
    const resume = resumeResult.rows[0];
    if (!resume) {
      return next({
        log: 'Error occurred in addApplication middleware: resume with specified name not found.',
        status: 409,
        message: 'Resume with specified name is not found in user\'s saved resumes.'
      });
    }
    await query('BEGIN', []);
    const addApplicationQuery = `
      INSERT INTO applications (
        user_id, resume_id, coverletter_status, date_submitted, submission_method, company, job_title, resume_name, link
      ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 )
      RETURNING *;
    `;
    try {
      const { rows } = await query(addApplicationQuery, [
        user_id,
        resume._id,
        coverletter_status,
        date_submitted,
        submission_method,
        company,
        job_title,
        resume_name,
        link,
      ]);
      res.locals.newApplication = rows[0];
      return next();
    } catch (error: unknown) {
      return next({
        log: `Error occurred in addApplication middleware: ${error}`,
        message: 'Unable to add application.',
      });
    }
  },
  updateApplication: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      coverletter_status,
      date_submitted,
      submission_method,
      progress_status,
      company,
      job_title,
      link,
      application_id,
    } = req.body;
    await query('BEGIN', []);
    const updateApplicationQuery = `UPDATE applications SET ( 
      coverletter_status,
      date_submitted,
      submission_method,
      progress_status,
      company,
      job_title,
      link) = ($1, $2, $3, $4, $5, $6, $7) WHERE _id = $8 RETURNING *`;
    try {
      const { rows } = await query(updateApplicationQuery, [
        coverletter_status,
        date_submitted,
        submission_method,
        progress_status,
        company,
        job_title,
        link,
        application_id,
      ]);
      res.locals.updatedApplication = rows[0];
      return next();
    } catch (error: unknown) {
      return next({
        log: `Error occurred in updateApplication middleware: ${error}`,
        message: 'Unable to update application.',
      });
    }
  },
  updateResumeSuccessRate: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const resume_id =
      res.locals.updatedApplication ?
      res.locals.updatedApplication.resume_id :
      res.locals.newApplication.resume_id;
    try {
      const applicationQuery =
        'SELECT progress_status FROM applications WHERE resume_id = $1';
      const { rows } = await query(applicationQuery, [resume_id]);
      if (!rows.length)
        return next({
          log: 'Error occurred in updateResumeSuccessRate middleware: no applications using this resume',
          message: 'No applications are using this resume.',
        });
      const totalApplications = rows.length;
      const successfulApplications = rows.reduce((acc, { progress_status }) => {
        return progress_status >= 20 ? acc + 1 : acc;
      }, 0);
      const successRate =
        Math.round((successfulApplications / totalApplications) * 100);
      const updateSuccessRateQuery = `UPDATE resumes SET success_rate = ${successRate} WHERE _id = $1`;
      await query(updateSuccessRateQuery, [resume_id]);
      await query('COMMIT;', []);
      return next();
    } catch (error: unknown) {
      await query('ROLLBACK;', []);
      return next({
        log: `Error occurred in updateResumeSuccessRate middleware: ${error}`,
        message: 'Unable to update resume success rate.',
      });
    }
  },
};

