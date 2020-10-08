import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  login: string;
  email: string;
  password: string;
  telegram: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
  };
};

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      index: true,
      unique: true
    },
    email: String,
    password: String,
    telegram: {
      id: Number,
      first_name: String,
      last_name: String,
      username: String,
      photo_url: String
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<UserDocument>("User", userSchema);
