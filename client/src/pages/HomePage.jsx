import { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import MovieCard from "../components/MovieCard"; // Import the MovieCard component
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0); // Total number of movies, fetched from the API
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [loading, setLoading] = useState(true);

  // Fetch movies whenever the currentPage changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://movie-app-backend-cwps.onrender.com/api/movies`,
          {
            params: { page: currentPage, limit: 50 },
          }
        );
        setMovies(response.data.movies);
        setTotalMovies(response.data.totalMovies);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f4f4f9", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: 4 }}
      >
        <MovieFilterIcon
          sx={{ fontSize: 40, verticalAlign: "middle", color: "#1976d2" }}
        />{" "}
        Explore Movies
      </Typography>

      {/* Display Loading State */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress size={50} />
        </Box>
      ) : movies.length > 0 ? (
        <>
          {/* Movie Grid */}
          <Grid container spacing={6}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={3} lg={2.4} key={movie._id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination Controls */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 6,
            }}
          >
            <IconButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              sx={{
                marginRight: 2,
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <Typography variant="h6" sx={{ marginX: 2, fontWeight: "bold" }}>
              Page {currentPage} of {totalPages}
            </Typography>
            <IconButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              sx={{
                marginLeft: 2,
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No movies found. Try a different page!
          </Typography>
          <MovieFilterIcon sx={{ fontSize: 60, color: "#ccc" }} />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
