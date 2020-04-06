import {
  FieldDocument,
  FieldValidations,
  FieldProperties,
} from "../FieldSchema";

export type DateField = FieldDocument & {
  validations: FieldValidations;
  properties: FieldProperties;
};

export type DateAnswer = Date;