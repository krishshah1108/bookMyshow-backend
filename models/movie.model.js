import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "admins" },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Movie = mongoose.model("movies", movieSchema);

export default Movie;
