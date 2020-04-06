import {
  FieldDocument,
  FieldValidations,
  FieldProperties,
} from "../FieldSchema";

export type EmailField = FieldDocument & {
  validations: FieldValidations;
  properties: FieldProperties;
};

export type EmailAnswer = string;
