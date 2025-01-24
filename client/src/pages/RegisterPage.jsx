import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Grid,
  Paper,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // To track success state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://movie-app-backend-cwps.onrender.com/api/users/register",
        values
      );
      console.log(response.data);
      setSuccess(true);

      setTimeout(() => {
        navigate("/"); // Redirect to login page after successful registration
      }, 2000);
    } catch (err) {
      setError("Error: " + err.message);
      console.error(err.response?.data?.message);
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
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                {/* Name Field */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Name"
                    name="name"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <PersonIcon sx={{ color: "action.active", mr: 1 }} />
                      ),
                    }}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                {/* Email Field */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ color: "action.active", mr: 1 }} />
                      ),
                    }}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                {/* Password Field */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <LockIcon sx={{ color: "action.active", mr: 1 }} />
                      ),
                    }}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Register"
                    )}
                  </Button>
                </Grid>
              </Grid>

              {/* Display error or success messages */}
              {errors && errors.general && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errors.general}
                </Alert>
              )}
              {errors && errors.success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {errors.success}
                </Alert>
              )}
            </Form>
          )}
        </Formik>

        {/* Login link */}
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Already have an account?{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Registered successfully!
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

export default RegisterPage;
