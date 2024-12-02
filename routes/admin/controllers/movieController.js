import mongoose from "mongoose";
import models from "../../../models/zindex.js";
import response from "../../../utils/response_util.js";

const addMovie = async (req, res) => {
  try {
    const { title, description, genre, year } = req.body;
    const newMovie = new models.Movie({ title, description, genre, year });
    await newMovie.save();
    return response.success("Movie added successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.body.id);
    const movieFound = await models.Movie.findById(id);
    if (!movieFound) {
      return response.notFound("Movie not found", res);
    }
    await models.Movie.findByIdAndDelete(id);
    return response.success("Movie deleted successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const updateMovie = async (req, res) => {
  try {
    const {id} = req.body;
    const movieFound = await models.Movie.findById(id);
    if (!movieFound) {
      return response.notFound("Movie not found", res);
    }
    const updatedFields = {};
    if (req.body.title) {
      updatedFields.title = req.body.title;
    }
    if (req.body.description) {
      updatedFields.description = req.body.description;
    }
    if (req.body.genre) {
      updatedFields.genre = req.body.genre;
    }
    if (req.body.year) {
      updatedFields.year = req.body.year;
    }
    await models.Movie.findByIdAndUpdate(id, updatedFields, { new: true });
    return response.success("Movie updated successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const getMovieByGlobalSearch = async (req, res) => {
  try {
    const { search } = req.body;
    const regex = new RegExp(search, "i");
    const moviesFound = await models.Movie.find({
      $or: [{ title: regex }, { description: regex }, { genre: regex }],
    });
    if (_.isEmpty(moviesFound)) {
      return response.success("No movies found", 0, res);
    }
    return response.success("Movies :", moviesFound, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const movieController = {
  addMovie,
  deleteMovie,
  updateMovie,
  getMovieByGlobalSearch
};

export default movieController;