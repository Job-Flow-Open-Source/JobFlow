import { query } from '../models/databaseModel';
import express, { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

export const userController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, username, password } = req.body;
    try {
      const { rows } = await query('SELECT * FROM users WHERE username = $1', [username]);
      if (rows.length) {
        return next({
          log: 'Error occured in createUser middleware: username must be unique',
          status: 409,
          message: 'Username has been taken.'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = `INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *`;
      const newUser = await query(insertQuery, [first_name, last_name, username, hashedPassword]);
      const {_id} = newUser.rows[0];
      res.locals.newUser = {_id, first_name, last_name, username};
      return next();
    } catch (error: unknown) {
        return next({
            log: `Error occurred in createUser middleware: ${error}`,
            message: 'Unable to create new user.',
        })
    }
  },
  verifyUser: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      const { rows } = await query('SELECT * FROM users WHERE username = $1', [username]);
      
      if (rows.length && await bcrypt.compare(password, rows[0].password)) {
        const {_id, first_name, last_name} = rows[0]
        res.locals.user = {_id, first_name, last_name, username};
        return next();
      }
      
      return next({
        log: 'Error occured in verifyUser middleware: username or password is incorrect',
        status: 401,
        message: 'Username or password is incorrect'
      });
    } catch (error: unknown) {
      return next({
        log: `Error occurred in verifyUser middleware: ${error}`,
        message: 'Unable to verify user'
      })
    }
  }
};