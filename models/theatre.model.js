import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { _id: false, versionKey: false },
);

const screenSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    layoutType: { type: String, enum: ['IMAX', '3D', '2D'], required: true },
    isActive: { type: Boolean, default: true },
  },
  { _id: true, versionKey: false },
);

const theatreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: locationSchema, required: true },
    screens: {
      type: [screenSchema],
      required: true,
    },
    facilities: { type: [String], required: false },
    isActive: { type: Boolean, default: true },
  },
  {
    versionKey: false,
  },
);
const Theatre = mongoose.model('theatres', theatreSchema);

export default Theatre;
