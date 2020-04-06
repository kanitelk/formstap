import mongoose from "mongoose";

export type FieldDocument = mongoose.Document & {
  title: string;
  type: FieldTypeEnum;
  user_id: mongoose.Types.ObjectId;
};

export type FieldProperties = {
  description?: string;
}

export type FieldValidations = {
  required?: boolean;
}

export enum FieldTypeEnum {
  input = "input",
  textarea = "textarea",
  number = "number",
  phone = "phone",
  email = "email",
  dropdown = "drowdown",
  date = "date"
}

const fieldSchema = new mongoose.Schema(
  {
    title: String,
    user_id: {
      type: mongoose.Types.ObjectId,

    },
    type: {
      type: String,
      enum: ["input", "textarea", "number", "phone", "email", "dropdown", "date"]
    },
    validations: mongoose.SchemaTypes.Mixed,
    properties: mongoose.SchemaTypes.Mixed
  },
  {
    timestamps: true,
  }
);

export const Field = mongoose.model<FieldDocument>("Field", fieldSchema);
