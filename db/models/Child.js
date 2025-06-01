import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String },
  location: { type: String },
  education: { type: String },
  background: { type: String },
  status: { type: String, default: "Pending" },
  photo: { type: String }, // photo file name or URL
  submittedAt: { type: Date, default: Date.now },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Child = mongoose.model("Child", childSchema);
export default Child;
