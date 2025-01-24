// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   Route,
//   RouterProvider,
//   createRoutesFromElements,
// } from "react-router-dom";
// import "./index.css";
// import App from "./App.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import RegisterPage from "./pages/RegisterPage.jsx";
// import HomePage from "./pages/HomePage.jsx";
// import SearchPage from "./pages/SearchPage.jsx";
// import AddMoviePage from "./pages/AddMoviePage.jsx";
// import EditingPage from "./pages/EditingPage.jsx";
// import UpdateMoviePage from "./pages/UpdateMoviePage.jsx";
// import NotFoundPage from "./pages/NotFoundPage.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import { AuthProvider } from "./context/AuthContext.jsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="/" index={true} element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="" element={<ProtectedRoute />}>
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/search" element={<SearchPage />} />
//         <Route path="/add" element={<AddMoviePage />} />
//         <Route path="/edit" element={<EditingPage />} />
//         <Route path="/update/:id" element={<UpdateMoviePage />} />
//       </Route>
//       <Route path="*" element={<NotFoundPage />} />
//     </Route>
//   )
// );

// createRoot(document.getElementById("root")).render(
//   <AuthProvider>
//     <RouterProvider router={router} />
//   </AuthProvider>
// );
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Add these imports
import "./index.css";
import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import AddMoviePage from "./pages/AddMoviePage.jsx";
import EditingPage from "./pages/EditingPage.jsx";
import UpdateMoviePage from "./pages/UpdateMoviePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

// Create a Material UI theme (you can customize this theme)
const theme = createTheme();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/add" element={<AddMoviePage />} />
        <Route path="/edit" element={<EditingPage />} />
        <Route path="/update/:id" element={<UpdateMoviePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      {" "}
      {/* Wrap your app in ThemeProvider */}
      <RouterProvider router={router} />
    </ThemeProvider>
  </AuthProvider>
);
