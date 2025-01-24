import { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

const EditingPage = () => {
  const token = localStorage.getItem("authToken");

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0); // Total number of movies, fetched from the API
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDelete = async (movieId) => {
    try {
      await axios.delete(
        `https://movie-app-backend-cwps.onrender.com/api/movies/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMovies((prevMovies) => {
        const updatedMovies = prevMovies.filter(
          (movie) => movie._id !== movieId
        );

        // Check if the current page is the last page and if there are no more movies
        if (
          updatedMovies.length === 0 &&
          currentPage === totalPages &&
          currentPage > 1
        ) {
          // If it's the last page with only one movie, go back to the first page
          setCurrentPage(1);
        } else {
          // Otherwise, just update the movies list
          setMovies(updatedMovies);
        }

        return updatedMovies;
      });
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 },
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #80deea)"
      }}
    >
      <Typography
        variant={isSmallScreen ? "h5" : "h4"}
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          color: "orange",
        }}
      >
        <MovieFilterIcon sx={{ fontSize: isSmallScreen ? 30 : 40 }} />
        Movies Collection
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
          {/* Movie Grid with 5 items per row */}
          <Grid container spacing={6}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={movie._id}>
                <MovieCard movie={movie} onDelete={handleDelete} />
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
              gap: 2,
            }}
          >
            <IconButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              sx={{
                backgroundColor: "orange",
                color: "#fff",
                "&:hover": { backgroundColor: "#1565c0" },
                borderRadius: "50%",
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#333", marginX: 2 }}
            >
              Page {currentPage} of {totalPages}
            </Typography>
            <IconButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              sx={{
                backgroundColor: "orange",
                color: "#fff",
                "&:hover": { backgroundColor: "#1565c0" },
                borderRadius: "50%",
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

export default EditingPage;
