import express from "express";
import cors from "cors";
import path from 'path';
import corsOptions from './config/cors.config';
import authRoutes from './routes/auth.routes';
<<<<<<< HEAD
import templateRoutes from "./routes/template.routes";
=======
import adminRoutes from './routes/admin.routes';
>>>>>>> fd108fc (Added admin role in to the server)
import { requestLogger } from './middlewares/logger.middlewares';
import { errorHandler } from './middlewares/error.middlewares';

const app = express();


// ─── Global Middleware ────────────────────────────────────────────
// These run on every single request that comes into our server.

app.use(cors(corsOptions));               // Handle cross-origin requests from the React frontend
app.use(express.json());                  // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(requestLogger);                   // Log every request for debugging

// ─── Static File Serving ──────────────────────────────────────────
// Uploaded template images and generated certificate PDFs are served directly
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


// ─── API Routes ───────────────────────────────────────────────────
// Each route module handles a specific feature area of the app
app.use('/api/auth', authRoutes);                // Login, register, token management
<<<<<<< HEAD
app.use('/api/templates', templateRoutes);       // Upload & manage certificate templates
=======
app.use('/api/admin', adminRoutes);              // Admin panel operations
>>>>>>> fd108fc (Added admin role in to the server)


// ─── Health Check ─────────────────────────────────────────────────
// Quick endpoint to confirm the server is alive (useful for monitoring)
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// ─── Error Handling ───────────────────────────────────────────────
// This must be the LAST middleware — catches anything that slipped through
app.use(errorHandler);

export default app;
