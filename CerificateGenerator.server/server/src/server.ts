import app from './app';
import { pool } from './config/db';

const PORT = process.env.PORT || 4000;

// Verify database connection before starting server
pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL Database');

    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
      console.log(` API Documentation: http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('PostgreSQL connection failed:', err.message);
    process.exit(1);
  });


