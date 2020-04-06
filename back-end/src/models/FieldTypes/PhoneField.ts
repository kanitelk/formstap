import {
  FieldDocument,
  FieldValidations,
  FieldProperties,
} from "../FieldSchema";

export type NumberField = FieldDocument & {
  validations: FieldValidations;
  properties: FieldProperties & NumberFieldProperties
};

type NumberFieldProperties = {
  min?: number;
  max?: number;
  step?: number;
}

export type PhoneAnswer = string;