import mongoose from "mongoose";
import { FieldTypeEnum } from "./FieldSchema";
import { DateAnswer } from "./FieldTypes/DateField";
import { DropdownAnswer } from "./FieldTypes/DropdownField";
import { EmailAnswer } from "./FieldTypes/EmailField";
import { InputAnswer } from "./FieldTypes/InputField";
import { NumberAnswer } from "./FieldTypes/NumberField";
import { PhoneAnswer } from "./FieldTypes/PhoneField";
import { TextareaAnswer } from "./FieldTypes/TextareaField";

interface Answer {
  field_id: mongoose.Types.ObjectId,
  type: FieldTypeEnum;
  answer:
    | DateAnswer
    | DropdownAnswer
    | EmailAnswer
    | InputAnswer
    | NumberAnswer
    | PhoneAnswer
    | TextareaAnswer;
}

export type AnswerDocument = mongoose.Document & {
  form_id: mongoose.Types.ObjectId;
  answers: Answer[];
};

const answerSchema = new mongoose.Schema(
  {
    title: String,
    theme: String,
    answers: [{ type: mongoose.SchemaTypes.Mixed }],
  },
  {
    timestamps: true,
  }
);

export const Answer = mongoose.model<AnswerDocument>("Answer", answerSchema);
