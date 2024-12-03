import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false },
);

const Admin = mongoose.model("admins", adminSchema);

export default Admin;
