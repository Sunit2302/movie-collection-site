import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    year: {
      type: String,
    },
    rating: {
      type: String,
    },
    link: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
