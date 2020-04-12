import mongoose from "mongoose";
import { FieldDocument } from "./FieldSchema";

export type FormSettings = {
  is_active: boolean;
  is_public: boolean;
  language: string;
  show_progress_bar: boolean;
  show_copyright: boolean;
  meta: any;
  notifications: String;
  reward: RewardSettings;
};

export type RewardSettings = {
  address: string,
  seed: string,
  coin: string,
  amount: number,
  is_auto: boolean;
  is_active: boolean;
}

export type FormDocument = mongoose.Document & {
  user_id: mongoose.Types.ObjectId;
  title: string;
  settings: FormSettings;
  theme: string;
  fields: FieldDocument[];
  reward: RewardSettings;
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
    settings: {
      is_active: {
        type: Boolean,
        default: true,
      },
      notifications: String
    },
    reward: {
      address: String,
      seed: String,
      coin: String,
      amount: Number,
      is_auto: Boolean,
      is_active: {
        type: Boolean,
        default: false
      }
    }
  },
  {
    timestamps: true,
  }
);

export const Form = mongoose.model<FormDocument>("Form", formSchema);
