import {
  FieldDocument,
  FieldValidations,
  FieldProperties,
} from "../FieldSchema";

export type InputField = FieldDocument & {
  validations: FieldValidations;
  properties: FieldProperties
};

export type NumberAnswer = number;