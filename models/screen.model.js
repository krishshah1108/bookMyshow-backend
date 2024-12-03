import mongoose from "mongoose";

const screenSchema = new mongoose.Schema(
  {
    theatreId: { type: mongoose.Schema.Types.ObjectId, ref: "theatres" },
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    layoutType: { type: String, enum: ["IMAX", "3D", "2D"], required: true },
    isActive: { type: Boolean, default: true },
  },
  { _id: true, versionKey: false }
);

const Screen = mongoose.model("screens", screenSchema);

export default Screen;
