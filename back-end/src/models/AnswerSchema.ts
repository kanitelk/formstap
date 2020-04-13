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
  user_data: any;
  reward: {
    coin: string,
    amount: number,
    link?: string,
    hash?: string
    status: RewardStatusEnum
  }
};

export enum RewardStatusEnum {
  success = "success",
  error = "error",
  wait = "wait"
}

const answerSchema = new mongoose.Schema(
  {
    form_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Form'
    },
    answers: [{ type: mongoose.SchemaTypes.Mixed }],
    user_data: {
      type: mongoose.SchemaTypes.Mixed
    },
    reward: {
      coin: String,
      amount: Number,
      link: String,
      hash: String,
      status: {
        type: String,
        enum: ['success', 'error', 'wait']
      }
    }
  },
  {
    timestamps: true,
  }
);

export const Answer = mongoose.model<AnswerDocument>("Answer", answerSchema);
