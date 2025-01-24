import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the context
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit Icon
import DeleteIcon from "@mui/icons-material/Delete"; // Import the Delete Icon
import axios from "axios";

const MovieCard = ({ movie, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // This should come from AuthContext, assuming you're logged in as admin
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (movieId) => {
    // Toggle the confirmation prompt
    setDeleteId(movieId);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    // Call onDelete function passed as prop to delete the movie
    await onDelete(deleteId);
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <Card
  sx={{
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
    p: 2,
    borderRadius: 3,
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
    },
    backgroundColor: "#ffffff",
  }}
>
  {/* Admin Icons */}
  {user.role === "admin" && (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
      <IconButton
        onClick={() => navigate(`/update/${movie._id}`)}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <EditIcon color="primary" />
      </IconButton>
      <IconButton
        onClick={() => handleDeleteClick(movie._id)}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <DeleteIcon color="error" />
      </IconButton>
    </Box>
  )}

  {/* Movie Image */}
  <img
    src={
      movie.image?.startsWith("http")
        ? movie.image
        : `https://movie-app-backend-cwps.onrender.com/uploads/${movie.image}`
    }
    alt={movie.title}
    style={{
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "15px",
      marginBottom: "16px",
    }}
  />

  {/* Movie Details */}
  <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      {movie.title}
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
      Year: <b>{movie.year}</b>
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
      Rating: <b>{movie.rating}</b>
    </Typography>
  </CardContent>

  {/* "View Movie" Button */}
  <Button
    href={movie.link}
    target="_blank"
    variant="contained"
    sx={{
      backgroundColor: "#ff9800",
      "&:hover": { backgroundColor: "#e68900" },
      borderRadius: "30px",
      py: 1.5,
      fontWeight: "bold",
      position: "relative",
      width: "80%",
      margin: "16px auto 0",
    }}
  >
    View Movie
  </Button>

  {/* Delete Confirmation Dialog */}
  {showConfirmDelete && (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 998,
        }}
      />
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 2,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
          zIndex: 999,
          textAlign: "center",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Are you sure you want to delete this movie?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleCancelDelete}>
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  )}
</Card>

  );
};

export default MovieCard;
