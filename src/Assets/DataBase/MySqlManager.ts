import mysql from 'mysql2/promise';
import logger from '../Utils/Logger.js';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'sadb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const Query = (sql: string): Promise<any> =>
  new Promise<any>(async (resolve, reject) => {
    await pool.query(sql)
      .then(([rows, fields]) => {
        const res = {
          rows,
          fields,
        };

        resolve(res);
      })
      .catch(err => {
        logger.error(`Error: ${err.stack}`);
        reject(err);
      });
  });