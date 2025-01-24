import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { fileURLToPath } from "url";
import path,{ dirname } from "path";


// __filename equivalent in ES module
const __filename = fileURLToPath(import.meta.url);

// __dirname equivalent in ES module
const __dirname = dirname(__filename);

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/movies", movieRoutes); // Movie routes
app.use("/api/users", userRoutes); // User routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
