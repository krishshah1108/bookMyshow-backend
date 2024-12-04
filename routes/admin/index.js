import express from "express";
import authController from "./controllers/authController.js";
import theatreController from "./controllers/theatreController.js";
import movieController from "./controllers/movieController.js";

const router = express.Router();

router.post("/register", authController.registerAdmin);
router.post("/login", authController.loginAdmin);
router.post("/update", authController.updateAdmin);
router.post("/change-admin-password", authController.changeAdminPassword);

router.post("/add-theatre", theatreController.addTheatre);
router.post("/update-theatre", theatreController.updateTheatre);
router.post("/delete-theatre", theatreController.deleteTheatre);
router.post("/getAlltheatres", theatreController.getAlltheatres);

router.post("/add-screen", theatreController.addScreen);
router.post("/update-screen", theatreController.updateScreen);
router.post("/delete-screen", theatreController.deleteScreen);
router.post("/getAllTheatreWiseScreens", theatreController.getAllTheatreWiseScreens);

router.post("/add-movie", movieController.addMovie);
router.post("/update-movie", movieController.updateMovie);
router.post("/delete-movie", movieController.deleteMovie);
router.post("/getMovieByGlobalSearch", movieController.getMovieByGlobalSearch);

export default router;
