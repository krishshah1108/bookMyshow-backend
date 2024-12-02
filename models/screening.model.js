import mongoose from "mongoose";

const screeningSchema = new mongoose.Schema(
  {
    theatreId: { type: mongoose.Schema.Types.ObjectId, ref: "theatres" },
    screenId: { type: mongoose.Schema.Types.ObjectId, ref: "screens" },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movies" },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Screening = mongoose.model("screenings", screeningSchema);

export default Screening;
