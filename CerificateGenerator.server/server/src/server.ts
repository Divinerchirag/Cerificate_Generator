import dotenv from "dotenv";
import app from "./app";

// Load environment variables from .env file before anything else
dotenv.config();

// Use the port from environment or default to 5000
const PORT = process.env.PORT || 5000;


    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

