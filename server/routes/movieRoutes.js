import express from "express";
import multer from "multer";
import {
  fetchAndStoreMovies,
  createMovie,
  updateMovie,
  getMovies,
  getMovieById,
  deleteMovie,
  searchMovie,
} from "../controllers/movieController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get("/fetch-imdb", fetchAndStoreMovies); // Route to fetch and store IMDb movies
router.get("/", getMovies); // Get all movies
router.get("/search", searchMovie); // Get all movies
router.get("/:id", getMovieById); // Get movie by ID

router.use(protect); // Protect following routes
router.post("/add", admin, upload.single("file"), createMovie); // Admin can create movies
router.put("/:id", admin, upload.single("file"), updateMovie); // Admin can update movies
router.delete("/:id", admin, deleteMovie); // Admin can delete movies

export default router;
