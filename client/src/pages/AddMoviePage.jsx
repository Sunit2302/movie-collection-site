import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMoviePage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false); // To track success state
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    rating: "",
    link: "",
    file: null, // Store file object
    imagePreview: null, // Store image preview URL
  });
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Cleanup object URL
    return () => {
      if (formData.imagePreview) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);

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
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleClearImage = () => {
    setFormData((prev) => ({ ...prev, imagePreview: null }));
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
      !formData.link ||
      !formData.file
    ) {
      alert("Please fill in all the fields, including the image!");
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

    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("year", formData.year);
      form.append("rating", formData.rating);
      form.append("link", formData.link);
      form.append("file", formData.file); // Appending file to FormData

      const response = await axios.post(
        "https://movie-app-backend-cwps.onrender.com/api/movies/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Corrected Bearer token format
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Movie added successfully:", response.data);
      setSuccess(true);
      setTimeout(() => {
        navigate("/edit");
      }, 2000);
    } catch (error) {
      setError("Error creating movie");
      console.error("Error creating movie:", error);
    } finally {
      setLoading(false);
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
  sx={{
    background: "linear-gradient(to right, #e0f7fa, #80deea)",
  }}
>
  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      maxWidth: "600px",
      width: "100%",
      backgroundColor: "white",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      p: 4,
      borderRadius: 3,
      transition: "transform 0.3s ease-in-out",
      "&:hover": { transform: "scale(1.02)" },
    }}
  >
    {/* Header */}
    <Typography
      variant="h4"
      gutterBottom
      textAlign="center"
      fontWeight="bold"
      sx={{
        color: "#ff7043",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
      }}
    >
      Add New Movie
    </Typography>

    <Grid container spacing={3}>
      {/* Input Fields */}
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
          sx={{
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&:hover fieldset": { borderColor: "#ff7043" },
            },
          }}
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
          type="number"
          sx={{
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&:hover fieldset": { borderColor: "#ff7043" },
            },
          }}
        />
        <TextField
          fullWidth
          label="Rating (0-10)"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          variant="outlined"
          required
          margin="normal"
          type="number"
          sx={{
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&:hover fieldset": { borderColor: "#ff7043" },
            },
          }}
        />
        <TextField
          fullWidth
          label="Link (URL)"
          name="link"
          value={formData.link}
          onChange={handleChange}
          variant="outlined"
          required
          margin="normal"
          type="url"
          sx={{
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&:hover fieldset": { borderColor: "#ff7043" },
            },
          }}
        />
      </Grid>

      {/* Image Upload */}
      <Grid
        item
        xs={12}
        md={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {formData.imagePreview ? (
          <Box
            position="relative"
            width="100%"
            height="200px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="2px solid #ff7043"
            borderRadius={2}
            overflow="hidden"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
          >
            <img
              src={formData.imagePreview}
              alt="Selected"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <IconButton
              size="small"
              onClick={handleClearImage}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255,255,255,0.9)",
                "&:hover": { backgroundColor: "white" },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ) : (
          <Box
            width="100%"
            height="200px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="2px dashed #ccc"
            borderRadius={2}
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "#f9f9f9" },
            }}
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
                <UploadIcon sx={{ fontSize: 40, color: "#ff7043" }} />
                <Typography variant="body2" color="textSecondary">
                  Upload Image
                </Typography>
              </Box>
            </label>
          </Box>
        )}
      </Grid>

      {/* Submit Button */}
      <Grid item xs={12}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            height: "50px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: 3,
            background: "linear-gradient(to right, #ff7043, #ff9800)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(to right, #ff9800, #ff7043)",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Create Movie"
          )}
        </Button>
      </Grid>
    </Grid>

    {/* Success Snackbar */}
    <Snackbar
      open={success}
      autoHideDuration={2000}
      onClose={() => setSuccess(false)}
    >
      <Alert severity="success" sx={{ width: "100%" }}>
        Movie created successfully!
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
</Box>

  );
};

export default AddMoviePage;
