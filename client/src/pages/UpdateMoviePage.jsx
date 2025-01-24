import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close"; // Import Close icon
import UploadIcon from "@mui/icons-material/Upload"; // Add Upload Icon
import axios from "axios";

const UpdateMoviePage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    rating: "",
    link: "",
    file: null,
    imagePreview: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // To track success state
  const [imageLoading, setImageLoading] = useState(false); // For image loading state

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://movie-app-backend-cwps.onrender.com/api/movies/${id}`
        );
        const movie = response.data;
        setFormData({
          title: movie.title || "",
          year: movie.year || "",
          rating: movie.rating || "",
          link: movie.link || "",
          file: null,
          imagePreview: movie.image || null,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movie details");
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the input is for the rating, ensure it has no more than one decimal point.
    if (name === "rating") {
      // Prevent the user from entering more than one decimal point.
      const regex = /^(\d+(\.\d{0,1})?)?$/; // Matches up to one decimal point

      if (
        regex.test(value) &&
        (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 10))
      ) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setImageLoading(true);
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file: file,
        imagePreview: URL.createObjectURL(file),
      }));
      setImageLoading(false);
    }
  };

  const handleClearImage = () => {
    setFormData((prev) => ({ ...prev, image: null, imagePreview: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      isNaN(formData.rating) ||
      formData.rating < 0 ||
      formData.rating > 10 ||
      !/^\d(\.\d{1})?$/.test(formData.rating) // Ensure no more than one decimal point
    ) {
      alert(
        "Please enter a valid rating between 0 and 10, with one decimal place."
      );
      return;
    }

    if (
      !formData.title ||
      !formData.year ||
      !formData.rating ||
      !formData.link
    ) {
      alert("Please fill in all the fields!");
      return;
    }

    // Validate year
    if (!/^\d{4}$/.test(formData.year)) {
      alert("Please enter a valid year (e.g., 2023).");
      return;
    }

    // Validate rating (between 0 and 10)
    if (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 10) {
      alert("Please enter a valid rating between 0 and 10.");
      return;
    }

    // Validate URL
    try {
      new URL(formData.link); // Check if it's a valid URL
    } catch (e) {
      alert("Please enter a valid URL.");
      return;
    }

    try {
      const response = await axios.put(
        `https://movie-app-backend-cwps.onrender.com/api/movies/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setSuccess(true);
      setTimeout(() => {
        navigate("/edit");
      }, 2000);
    } catch (error) {
      setError("Failed to submit form");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      p={2}
      bgcolor="#f5f5f5"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        maxWidth="800px"
        width="100%"
        bgcolor="white"
        boxShadow={3}
        p={4}
        borderRadius={2}
        sx={{ padding: "20px", margin: "10px", borderRadius: "10px" }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Update Movie
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              variant="outlined"
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              variant="outlined"
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              variant="outlined"
              required
              margin="normal"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            {formData.imagePreview ? (
              <Box
                position="relative"
                width="100%"
                height="200px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid #ccc"
                borderRadius={2}
                overflow="hidden"
              >
                <img
                  src={
                    formData.imagePreview &&
                    formData.imagePreview.startsWith("http")
                      ? formData.imagePreview
                      : `https://movie-app-backend-cwps.onrender.com/uploads/${formData.imagePreview}`
                  }
                  alt="Selected"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <IconButton
                  size="small"
                  onClick={handleClearImage}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "white" },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ) : (
              <Box
                width="100%"
                height="200px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px dashed #ccc"
                borderRadius={2}
                sx={{ cursor: "pointer" }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-image"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="upload-image">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <UploadIcon sx={{ fontSize: "40px", color: "#aaa" }} />
                    <Typography variant="body2" color="textSecondary">
                      Upload Image
                    </Typography>
                  </Box>
                </label>
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={imageLoading}
              sx={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                backgroundColor: "#3f51b5",
                "&:hover": { backgroundColor: "#303f9f" },
              }}
            >
              {imageLoading ? "Updating..." : "Update Movie"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Movie updated successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={error !== null}
        autoHideDuration={3000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error || "An unexpected error occurred."}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateMoviePage;
