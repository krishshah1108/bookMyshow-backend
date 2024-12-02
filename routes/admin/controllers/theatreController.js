import mongoose from "mongoose";
import models from "../../../models/zindex.js";
import response from "../../../utils/response_util.js";

const addTheatre = async (req, res) => {
  try {
    const { name, location, screens, facilities } = req.body;

    const newTheatre = new models.Theatre({
      name,
      location,
      screens,
      facilities,
    });
    await newTheatre.save();
    return response.success("Theatre added successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const updateTheatre = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.body.id);
    const theatreFound = await models.Theatre.findById(id);
    if (!theatreFound) {
      return response.notFound("Theatre not found", res);
    }
    const updatedFields = {};
    if (req.body.name) {
      updatedFields.name = req.body.name;
    }
    if (req.body.location) {
      updatedFields.location = req.body.location;
    }
    if (req.body.facilities) {
      updatedFields.facilities = req.body.facilities;
    }
    await models.Theatre.findByIdAndUpdate(id, updatedFields, { new: true });
    return response.success("Theatre updated successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const deleteTheatre = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.body.id);
    const theatreFound = await models.Theatre.findById(id);
    if (!theatreFound) {
      return response.notFound("Theatre not found", res);
    }
    await models.Theatre.findByIdAndDelete(id);
    return response.success("Theatre deleted successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const getAlltheatres = async (req, res) => {
  try {
    await models.Theatre.find();
    return response.success("All theatres fetched successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const addScreen = async (req, res) => {
  try {
    const { theatreId, screens } = req.body;

    const theatreFound = await models.Theatre.findById(theatreId);
    if (!theatreFound) {
      return response.notFound("Theatre not found", res);
    }
    theatreFound.screens.push(screens);
    await theatreFound.save();
    return response.success("Screen added successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const deleteScreen = async (req, res) => {
  try {
    const { theatreId, screenId } = req.body;
    const theatreFound = await models.Theatre.findById(theatreId);
    if (!theatreFound) {
      return response.notFound("Theatre not found", res);
    }
    theatreFound.screens.pull(screenId);
    await theatreFound.save();
    return response.success("Screen deleted successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const updateScreen = async (req, res) => {
  const { theatreId, screenId, screen } = req.body;
  const theatreFound = await models.Theatre.findById(theatreId);
  if (!theatreFound) {
    return response.notFound("Theatre not found", res);
  }
  let screenToUpdate = theatreFound.screens.find(
    (screen) => screen._id.toString() == screenId
  );

  Object.assign(screenToUpdate, screen);

  await theatreFound.save();
  return response.success("Screen updated successfully", 1, res);
};

const theatreController = {
  addTheatre,
  updateTheatre,
  deleteTheatre,
  getAlltheatres,
  addScreen,
  deleteScreen,
  updateScreen,
};

export default theatreController;
