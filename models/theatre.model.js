import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { _id: false, versionKey: false }
);

const seatSchema = new mongoose.Schema(
  {
    row: { type: String, required: true },
    column: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "booked", "unavailable", "reserved"],
      required: true,
    },
    seatType: {
      type: String,
      enum: ["Normal", "Premium", "VIP"],
      required: true,
    },
  },
  { _id: false, versionKey: false }
);

const screenSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    layoutType: { type: String, enum: ["IMAX", "3D", "2D"], required: true },
    seats: { type: [seatSchema], required: true },
    isActive: { type: Boolean, default: true },
  },
  { _id: true, versionKey: false }
);

const theatreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: locationSchema, required: true },
    screens: { type: [screenSchema], required: true },
    facilities: { type: [String], required: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const Theatre = mongoose.model("theatres", theatreSchema);

export default Theatre;
