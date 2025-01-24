import axios from "axios";
import Movie from "../models/movieModel.js";

// Fetch and store IMDb movies
export const fetchAndStoreMovies = async () => {
  // Example list of IMDb IDs for the top 250 movies

  const movieIds = [
    "tt0111161",
    "tt0068646",
    "tt0071562",
    "tt0468569",
    "tt0050083",
    "tt0108052",
    "tt0167260",
    "tt0110912",
    "tt0137523",
    "tt1375666",
    "tt0109830",
    "tt0133093",
    "tt0080684",
    "tt0169547",
    "tt0038650",
    "tt0082971",
    "tt0099685",
    "tt0076759",
    "tt0034583",
    "tt0120737",
    "tt0031679",
    "tt0482571",
    "tt0209144",
    "tt0425112",
    "tt0167404",
    "tt0211915",
    "tt0047478",
    "tt0245429",
    "tt0095327",
    "tt0118799",
    "tt0147800",
    "tt0053125",
    "tt0082096",
    "tt0095765",
    "tt0485947",
    "tt0110413",
    "tt1853728",
    "tt0110357",
    "tt0399295",
    "tt0071315",
    "tt0071315",
    "tt0062622",
    "tt0056172",
    "tt0113247",
    "tt0271847",
    "tt0135892",
    "tt0077416",
    "tt0069890",
    "tt0032553",
    "tt0019254",
    "tt0249970",
    "tt0082980",
    "tt0209144",
    "tt0352967",
    "tt0037392",
    "tt1016150",
    "tt0109777",
    "tt0093426",
    "tt0056663",
    "tt0387793",
    "tt0095071",
    "tt0032076",
    "tt0045152",
    "tt0091167",
    "tt0047528",
    "tt0017925",
    "tt0062467",
    "tt0095057",
    "tt0062951",
    "tt0035721",
    "tt0027392",
    "tt0050601",
    "tt0027577",
    "tt0156944",
    "tt0030961",
    "tt0049398",
    "tt0044706",
    "tt0103096",
    "tt0059212",
    "tt0163269",
    "tt0085314",
    "tt0043014",
    "tt0046876",
    "tt0032431",
    "tt0059791",
    "tt0107290",
    "tt0049265",
    "tt0045005",
    "tt0090605",
    "tt0019417",
    "tt0013442",
    "tt0109855",
    "tt0027961",
    "tt0082733",
    "tt0104707",
    "tt0084726",
    "tt0048572",
    "tt0096424",
    "tt0032129",
    "tt0057350",
    "tt0044195",
    "tt0116282",
    "tt0119081",
    "tt0027078",
    "tt0114383",
    "tt0051493",
    "tt0081267",
    "tt0062824",
    "tt0094012",
    "tt0092985",
    "tt0082912",
    "tt0067021",
    "tt0088170",
    "tt0118849",
    "tt0096697",
    "tt0025863",
    "tt0036393",
    "tt0112807",
    "tt0044235",
    "tt0096933",
    "tt0094173",
    "tt0056170",
    "tt0091370",
    "tt0075314",
    "tt0074642",
    "tt0042068",
    "tt0044381",
    "tt0080823",
    "tt0044739",
    "tt0043796",
    "tt0026267",
    "tt0024012",
    "tt0074060",
    "tt0092168",
    "tt0084024",
    "tt0076321",
    "tt0036227",
    "tt0036172",
    "tt0028488",
    "tt0037762",
    "tt0051504",
    "tt0032976",
    "tt0073185",
    "tt0070471",
    "tt0050043",
    "tt0061722",
    "tt0026905",
    "tt0072837",
    "tt0038567",
    "tt0046344",
    "tt0032131",
    "tt0026395",
    "tt0044161",
    "tt0028637",
    "tt0048280",
    "tt0051792",
    "tt0060154",
    "tt0023132",
    "tt0039687",
    "tt0053282",
    "tt0078678",
    "tt0045680",
    "tt0036344",
    "tt0046963",
    "tt0049571",
    "tt0034517",
    "tt0065663",
    "tt0042149",
    "tt0027710",
    "tt0035277",
    "tt0029002",
    "tt0038043",
    "tt0074982",
    "tt0042583",
    "tt0028096",
    "tt0039503",
    "tt0030163",
    "tt0031028",
    "tt0031863",
    "tt0047227",
    "tt0103776",
    "tt0033045",
    "tt0101410",
    "tt0037053",
    "tt0048939",
    "tt0037669",
    "tt0044097",
    "tt0086505",
    "tt0035787",
    "tt0047747",
    "tt0031919",
    "tt0048325",
    "tt0037034",
    "tt0051095",
    "tt0067683",
    "tt0036461",
    "tt0064317",
    "tt0037173",
    "tt0056816",
    "tt0055040",
    "tt0052728",
    "tt0066283",
    "tt0070601",
    "tt0051214",
    "tt0024121",
    "tt0037325",
    "tt0054026",
    "tt0028200",
    "tt0064303",
    "tt0037880",
    "tt0051006",
    "tt0062891",
    "tt0029367",
    "tt0039356",
    "tt0032050",
    "tt0038011",
    "tt0023963",
    "tt0037557",
    "tt0030163",
    "tt0037793",
    "tt0028646",
    "tt0027721",
    "tt0037424",
    "tt0057573",
    "tt0036329",
    "tt0038004",
    "tt0028612",
    "tt0042852",
    "tt0048134",
    "tt0034529",
    "tt0030744",
    "tt0046586",
    "tt0032457",
    "tt0028757",
    "tt0030939",
    "tt0042680",
    "tt0046516",
    "tt0035687",
    "tt0037594",
    "tt0036559",
    "tt0035971",
    "tt0039195",
    "tt0042668",
    "tt0036819",
    "tt0037288",
    "tt0036345",
    "tt0032952",
    "tt0037025",
    "tt0046771",
    "tt0033208",
    "tt0041487",
    "tt0030742",
    "tt0035980",
    "tt0034931",
    "tt0032330",
    "tt0033545",
  ];

  const api_key = "d5db9037"; // Replace with your OMDb API key

  try {
    for (let id of movieIds) {
      // Fetch movie details from OMDb API using IMDb ID
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=${api_key}`
      );

      // Log response for debugging
      console.log(`Fetching data for movie ID: ${id}`);
      console.log("Response Data: ", response.data);

      // Check if the response is valid
      if (response.data.Response === "True") {
        const { Title, Year, imdbRating, imdbID, Poster } = response.data;

        const movie = new Movie({
          title: Title,
          year: Year,
          rating: imdbRating,
          link: `https://www.imdb.com/title/${imdbID}`,
          image: Poster,
        });

        // Save movie to the database
        await movie.save();
        console.log(`Movie saved: ${Title}`);
      } else {
        // Log any error in the response
        console.log(`Error fetching data for ID ${id}: ${response.data.Error}`);
      }
    }
  } catch (error) {
    // Detailed error handling for the request
    if (error.response) {
      console.error("Error fetching data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
};

// CRUD operations for movies
export const createMovie = async (req, res) => {
  const { title, year, rating, link } = req.body;
  const image = req.file; // Store image path in DB

  try {
    const movie = new Movie({
      title,
      year,
      rating,
      link,
      image: image.filename,
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: "Failed to create movie", error });
  }
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, year, rating, link } = req.body;
  const image = req.file; // Optional update for image

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    movie.title = title || movie.title;
    movie.year = year || movie.year;
    movie.rating = rating || movie.rating;
    movie.link = link || movie.link;
    if (image) movie.image = image.filename;

    await movie.save();
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Failed to update movie", error });
  }
};

export const getMovies = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 50; // Default to 50 items per page

  try {
    // Fetch movies with pagination
    const movies = await Movie.find()
      .skip((page - 1) * limit) // Skip the movies based on the current page
      .limit(limit); // Limit the number of movies to fetch

    // Count the total number of movies
    const totalMovies = await Movie.countDocuments();

    res.status(200).json({
      movies,
      totalMovies,
      totalPages: Math.ceil(totalMovies / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies", error });
  }
};

export const searchMovie = async (req, res) => {
  const { query, sort } = req.query; // Extract search and sort parameters

  try {
    // Build search filter (search by title or description)
    const searchFilter = query
      ? {
          $or: [{ title: { $regex: query, $options: "i" } }],
        }
      : {};

    // Define sort criteria
    let sortCriteria = {};
    if (sort === "title")
      sortCriteria = { title: 1 }; // Sort alphabetically by title (ascending)
    else if (sort === "year")
      sortCriteria = { year: -1 }; // Sort by release year (newest first)
    else if (sort === "rating") sortCriteria = { rating: -1 }; // Sort by rating (highest first)

    // Fetch and sort movies based on search and sorting criteria
    const movies = await Movie.find(searchFilter).sort(sortCriteria);

    // Return sorted results
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error searching or sorting movies:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete movie", error });
  }
};
