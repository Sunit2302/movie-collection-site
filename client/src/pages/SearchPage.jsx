import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import MovieCard from "../components/MovieCard";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setError("");
  };

  const handleSortChange = (event) => {
    setSortField(event.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchQuery.trim() === "") {
      setError("Please enter a search query.");
      return;
    }

    try {
      let queryParams = `query=${searchQuery}`;
      if (sortField) queryParams += `&sort=${sortField}`;

      const response = await fetch(
        `https://movie-app-backend-cwps.onrender.com/api/movies/search?${queryParams}`
      );

      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("An error occurred while fetching movies. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        minHeight: "100vh",
        overflowY: "auto",
        background: "#f4f4f9",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        Search Movies
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        error={!!error}
        helperText={error || ""}
        sx={{ marginBottom: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* Sort Options */}
      <Select
        value={sortField}
        onChange={handleSortChange}
        displayEmpty
        fullWidth
        sx={{ marginBottom: 3 }}
        startAdornment={
          <InputAdornment position="start">
            <SortIcon />
          </InputAdornment>
        }
      >
        <MenuItem value="">Sort by...</MenuItem>
        <MenuItem value="title">Name</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
        <MenuItem value="year">Release Year</MenuItem>
      </Select>

      {/* Search Button */}
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSearchSubmit}
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          Search
        </Button>
      </Box>

      {/* Display Search Results */}
      {results.length > 0 ? (
        <Box sx={{ marginTop: 4 }}>
          <Grid container spacing={3}>
            {results.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          {!searchQuery.trim() ? (
            ""
          ) : (
            <>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No results found. Try again!
              </Typography>
              <SearchIcon sx={{ fontSize: 50, color: "#ccc" }} />
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;
