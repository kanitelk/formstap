import {
  FieldDocument,
  FieldValidations,
  FieldProperties,
} from "../FieldSchema";

export type TextareaField = FieldDocument & {
  validations: FieldValidations;
  properties: FieldProperties;
};

export type TextareaAnswer = string;