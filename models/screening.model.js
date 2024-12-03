import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    seatType: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false, versionKey: false }
);
const timingSchema = new mongoose.Schema(
  {
    movieDate: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: [priceSchema], required: true },
    isActive: { type: Boolean, default: true },
  },
  { _id: false, versionKey: false }
);
const screeningSchema = new mongoose.Schema(
  {
    theatreId: { type: mongoose.Schema.Types.ObjectId, ref: "theatres" },
    screenId: { type: mongoose.Schema.Types.ObjectId, ref: "screens" },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movies" },
    timings: { type: [timingSchema], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Screening = mongoose.model("screenings", screeningSchema);

export default Screening;
