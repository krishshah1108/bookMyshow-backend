import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema(
  {
    screeningId: { type: mongoose.Schema.Types.ObjectId, ref: 'screenings' },
    row: { type: String, required: true },
    column: { type: String, required: true },
    status: {
      type: String,
      enum: ['available', 'booked', 'unavailable', 'reserved'],
      required: true,
    },
    seatType: {
      type: String,
      enum: ['Normal', 'Premium', 'VIP'],
      required: true,
    },
  },
  { versionKey: false },
);

const Seat = mongoose.model('seats', seatSchema);

export default Seat;
