import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { _id: false, versionKey: false }
);

const theatreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: locationSchema, required: true },
    screens: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "screens",
      required: true,
    },
    facilities: { type: [String], required: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const Theatre = mongoose.model("theatres", theatreSchema);

export default Theatre;
