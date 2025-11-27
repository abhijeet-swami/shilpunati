import mongoose from "mongoose";
import argon2 from "argon2";

const artisanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
      maxlength: 500,
    },
    skills: [
      {
        type: String,
        index: true,
      },
    ],
    phone: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    location: {
      district: {
        type: String,
        default: null,
        trim: true,
      },
      state: {
        type: String,
        default: null,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

artisanSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await argon2.hash(this.password);
  next();
});

artisanSchema.methods.verifyPassword = async function (password) {
  return await argon2.verify(this.password, password);
};

const Artisan = mongoose.model("Artisan", artisanSchema);

export default Artisan;
