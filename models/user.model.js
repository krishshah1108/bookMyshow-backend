import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    seatId: { type: [mongoose.Schema.Types.ObjectId], ref: 'seats' },
  },
  { timestamps: true, versionKey: false },
);

const User = mongoose.model('users', userSchema);

export default User;
