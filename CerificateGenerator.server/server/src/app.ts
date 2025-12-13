import express from "express";
import cors from "cors";


const app = express();


// ─── Global Middleware ────────────────────────────────────────────
// These run on every single request that comes into our server.

app.use(cors(corsOptions));               // Handle cross-origin requests from the React frontend
app.use(express.json());                  // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(requestLogger);                   // Log every request for debugging

// ─── Health Check ─────────────────────────────────────────────────
// Quick endpoint to confirm the server is alive (useful for monitoring)
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// ─── Error Handling ───────────────────────────────────────────────
// This must be the LAST middleware — catches anything that slipped through
app.use(errorHandler);

export default app;
