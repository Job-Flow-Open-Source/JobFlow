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
      res.locals.newUser = newUser;
      return next();
    } catch (error: unknown) {
        return next({
            log: `Error occurred in createUser middleware: ${error}`,
            message: 'Unable to create new user.',
        })
    }
  },
};