🎬 Movie Management System

A robust and user-friendly Movie Management System built with React and Node.js (Express), designed to allow users to add, update, view, and delete movie records. The project includes support for uploading movie images, managing a list of movies with key details, and providing validation for seamless user interaction.

🚀 Features
Add Movies:
Add new movies by providing essential details such as:
Title
Year
Rating (validated as a number between 0 and 10 with one decimal point)
Trailer/Official link (must be a valid URL)
Movie image upload (with preview before submission)
Update Movies:
Edit movie details, including the title, year, rating, and image, with real-time validation.

Delete Movies:
Remove movies from the database with ease.

Movie List:
View all movies with their details, such as title, year, rating, and image, displayed in a clean and modern interface.

Validation:
Frontend validation ensures input fields are accurate before submission.

🛠️ Tech Stack

Frontend
React.js: For building a dynamic and responsive user interface.
Material-UI: Pre-built components for a sleek, modern, and responsive design.
Axios: For making HTTP requests to interact with the backend API.
React Router: Smooth navigation between pages like the movie list and update pages.
Form Validation: Regex-based validation ensures input accuracy.
Backend
Node.js with Express.js: Provides RESTful API endpoints to manage movie data.
MongoDB: Stores movie details like title, year, rating, image path, and more.
Mongoose: An ODM (Object Data Modeling) library for seamless database interaction.
🌟 Additional Features
Image Upload:

Upload and store movie images.
Preview images before submission.
Authentication:

Secured endpoints with token-based authentication using JWT.


📌 API Endpoints


GET /api/movies: Fetch all movies.
POST /api/movies: Add a new movie (title, year, rating, link, and image).
PUT /api/movies/:id: Update movie details by ID.
DELETE /api/movies/:id: Delete a movie by ID.
