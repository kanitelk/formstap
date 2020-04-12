export type FormSettings = {
  is_active: boolean;
  is_public: boolean;
  language: string;
  show_progress_bar: boolean;
  show_copyright: boolean;
  meta: any;
  notifications: string;
};

export type TForm = {
  _id?: string;
  user_id?: string;
  title: string;
  theme: string;
  fields: TField[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type TFormEditor = {
  _id?: string;
  user_id?: string;
  title: string;
  settings: FormSettings;
  theme: string;
  fields: TField[];
  createdAt?: Date;
  updatedAt?: Date;
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

export type TField = {
  _id?: string;
  title: string;
  type: FieldTypeEnum;
  user_id?: string;
  createdAt?: Date;
  updatedAt: Date;
  properties: any;
  validations: any;
};

export type FieldProperties = {
  description?: string;
};

export type FieldValidations = {
  required?: boolean;
};

export enum FieldTypeEnum {
  input = "input",
  textarea = "textarea",
  number = "number",
  phone = "phone",
  email = "email",
  dropdown = "dropdown",
  date = "date",
}

export interface Answer {
  field_id: string;
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

export type DateAnswer = Date;
export type DropdownAnswer = string;
export type EmailAnswer = string;
export type InputAnswer = string;
export type NumberAnswer = number;
export type PhoneAnswer = string;
export type TextareaAnswer = string;
