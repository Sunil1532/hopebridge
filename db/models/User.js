import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // not required, because Google users won't have this
  role: { type: String, enum: [ 'donor', 'volunteer', 'admin'], default: 'volunteer' },
  googleId: { type: String }, // add this field to store Google ID for Google login users
}, { timestamps: true });

export default mongoose.model('User', userSchema);
