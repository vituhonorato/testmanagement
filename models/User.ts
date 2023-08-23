import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    certificals: [
      {
        namecertifical: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String },
        description: { type: String, required: true },
        contact: { type: String, required: true },
        date: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
