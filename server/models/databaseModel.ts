import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.PG_URI });

export const query = async (text: string, params: unknown[]) => {
  try {
    console.log('executed query', text);
    const result = await pool.query(text, params);
    return result;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};
