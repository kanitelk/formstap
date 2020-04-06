import mongoose from "mongoose";
import { FieldDocument } from "./FieldSchema";

export type FormSettings = {
  is_public: boolean;
  language: string;
  show_progress_bar: boolean;
  show_copyright: boolean;
  meta: any;
  notifications: any;
};

export type FormDocument = mongoose.Document & {
  user_id: mongoose.Types.ObjectId;
  title: string;
  settings: FormSettings;
  theme: string;
  fields: FieldDocument[];
};

const formSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
      default: "New form",
    },
    theme: String,
    fields: [{ type: mongoose.Types.ObjectId, ref: "Field" }],
  },
  {
    timestamps: true,
  }
);


export const Form = mongoose.model<FormDocument>("Form", formSchema);
