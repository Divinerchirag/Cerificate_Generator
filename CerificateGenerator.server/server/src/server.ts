
import dotenv from 'dotenv';
import app from './app';
import { initDb } from './script/init.script';

// Load environment variables from .env file before anything else
dotenv.config();

// Use the port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// First set up our database tables, then start listening for requests
initDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        // If the database isn't reachable, there's no point in running the server
        console.error('Failed to initialize database:', err);
        process.exit(1);
    });
